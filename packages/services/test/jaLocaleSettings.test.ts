import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  JA_LOCALE_SETTINGS_KEY,
  decodeJaLocaleFromDisk,
  encodeJaLocaleForDisk,
} from "@zcode/shared";
import { createSettingService } from "../src/setting/settingService.js";

test("encode: ja-JP は en-US に置き換えて目印を残す", () => {
  const encoded = encodeJaLocaleForDisk({ locale: "ja-JP", localePreference: "ja-JP", a: 1 });
  assert.deepEqual(encoded, {
    locale: "en-US",
    localePreference: "en-US",
    a: 1,
    [JA_LOCALE_SETTINGS_KEY]: { locale: "ja-JP", localePreference: "ja-JP" },
  });
});

test("encode: 日本語でなければ目印を消す", () => {
  const encoded = encodeJaLocaleForDisk({
    locale: "zh-CN",
    localePreference: "system",
    [JA_LOCALE_SETTINGS_KEY]: { locale: "ja-JP" },
  });
  assert.deepEqual(encoded, { locale: "zh-CN", localePreference: "system" });
});

test("decode: 目印があり en-US のままなら ja-JP に戻す", () => {
  const decoded = decodeJaLocaleFromDisk({
    locale: "en-US",
    localePreference: "system",
    [JA_LOCALE_SETTINGS_KEY]: { locale: "ja-JP" },
  });
  assert.deepEqual(decoded, { locale: "ja-JP", localePreference: "system" });
});

test("decode: 公式版で別の言語に変えられていたら、その選択を優先する", () => {
  const decoded = decodeJaLocaleFromDisk({
    locale: "zh-CN",
    localePreference: "zh-CN",
    [JA_LOCALE_SETTINGS_KEY]: { locale: "ja-JP", localePreference: "ja-JP" },
  });
  assert.deepEqual(decoded, { locale: "zh-CN", localePreference: "zh-CN" });
});

test("settingService: setting.json に ja-JP を書かず、読み直すと ja-JP に戻る", async () => {
  const home = await mkdtemp(join(tmpdir(), "zcode-jp-locale-"));
  const previousHome = process.env.ZCODE_DESKTOP_HOME_DIR;
  process.env.ZCODE_DESKTOP_HOME_DIR = home;
  try {
    await mkdir(join(home, ".zcode", "v2"), { recursive: true });
    await writeFile(
      join(home, ".zcode", "v2", "setting.json"),
      JSON.stringify({ recentProjects: ["/tmp/project"], locale: "en-US" }),
    );
    const service = createSettingService();
    await service.update({ locale: "ja-JP", localePreference: "ja-JP" });

    const raw = JSON.parse(await readFile(join(home, ".zcode", "v2", "setting.json"), "utf-8"));
    assert.equal(raw.locale, "en-US");
    assert.equal(raw.localePreference, "en-US");
    assert.deepEqual(raw[JA_LOCALE_SETTINGS_KEY], { locale: "ja-JP", localePreference: "ja-JP" });
    assert.deepEqual(raw.recentProjects, ["/tmp/project"]);

    const settings = await service.get();
    assert.equal(settings.locale, "ja-JP");
    assert.equal(settings.localePreference, "ja-JP");
  } finally {
    if (previousHome === undefined) delete process.env.ZCODE_DESKTOP_HOME_DIR;
    else process.env.ZCODE_DESKTOP_HOME_DIR = previousHome;
    await rm(home, { recursive: true, force: true });
  }
});
