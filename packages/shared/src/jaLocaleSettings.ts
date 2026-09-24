/**
 * 日本語の選択を setting.json に保存するときの変換。
 *
 * setting.json（~/.zcode/v2/setting.json）は、ja-JP に対応していない旧版の ZCode とも共有される。
 * 旧版は locale / localePreference に "ja-JP" があると設定全体を不正とみなし、
 * すべて既定値で読み直してしまう。そのため、ファイルには旧版も読める "en-US" を書き、
 * 日本語を選んだことは旧版が無視する別の項目（JA_LOCALE_SETTINGS_KEY）に記録する。
 */
export const JA_LOCALE_SETTINGS_KEY = "zcodeJpLocale";

const JA_LOCALE = "ja-JP";
const DISK_FALLBACK_LOCALE = "en-US";
const LOCALE_FIELDS = ["locale", "localePreference"] as const;

type LocaleField = (typeof LOCALE_FIELDS)[number];
type JaLocaleMarker = Partial<Record<LocaleField, typeof JA_LOCALE>>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** 保存する直前に呼ぶ。"ja-JP" を "en-US" に置き換え、元の値を目印の項目に残す。 */
export function encodeJaLocaleForDisk<T extends object>(settings: T): T {
  const encoded = { ...settings } as Record<string, unknown>;
  const marker: JaLocaleMarker = {};
  for (const field of LOCALE_FIELDS) {
    if (encoded[field] === JA_LOCALE) {
      encoded[field] = DISK_FALLBACK_LOCALE;
      marker[field] = JA_LOCALE;
    }
  }
  if (Object.keys(marker).length > 0) {
    encoded[JA_LOCALE_SETTINGS_KEY] = marker;
  } else {
    delete encoded[JA_LOCALE_SETTINGS_KEY];
  }
  return encoded as T;
}

/**
 * 読み込んだ直後、検査の前に呼ぶ。目印の項目があり、値がまだ "en-US" のままなら "ja-JP" に戻す。
 * 旧版で別の言語に切り替えられていた場合は、その選択を優先して日本語に戻さない。
 */
export function decodeJaLocaleFromDisk(raw: unknown): unknown {
  if (!isPlainObject(raw)) return raw;
  const { [JA_LOCALE_SETTINGS_KEY]: marker, ...rest } = raw;
  if (!isPlainObject(marker)) return rest;
  for (const field of LOCALE_FIELDS) {
    if (marker[field] === JA_LOCALE && rest[field] === DISK_FALLBACK_LOCALE) {
      rest[field] = JA_LOCALE;
    }
  }
  return rest;
}
