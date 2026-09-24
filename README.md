**他の言語で読む:** [English](README.en.md) | [简体中文](README.zh-CN.md)

# ZCode-JP（ZCode の日本語版）

## ZCode-JP について

ZCode-JP は、[ZCode](https://github.com/zai-org/ZCode) を日本語で使えるようにした**非公式**の版です。Z.ai や ZCode の開発チームとは関係がありません。この版の不具合は、本家ではなく [veltrea/ZCode-JP](https://github.com/veltrea/ZCode-JP/issues) に報告してください。

元にしたのは、本家 ZCode の v3.14.3（コミット `328c1a0`）です。

本家へ取り込みを依頼するための変更は、[`ja-localize`](https://github.com/veltrea/ZCode-JP/tree/ja-localize) という枝にまとめてあります。この枝では、本家のファイルの書き換えを最小限にしています。

### この版で変えたこと

- デスクトップ版・Web 版・CLI / TUI の画面の言語に、日本語（`ja-JP`）を加えました。
- システムの言語が日本語なら、自動で日本語になります。設定 → 一般 → 言語 で「日本語」を選ぶこともできます。CLI では `--locale ja-JP` を付けて起動します。
- 日本語の文書を加えました。[README.md](README.md)（このページ）、[NOTICE.ja.md](NOTICE.ja.md)、[apps/zcode-cli/README.ja.md](apps/zcode-cli/README.ja.md) です。

### 日本語にならないところ

- 意見の送信・Coding Plan・会話の共有・コミュニティは、外部のサイトです。これらは中国語と英語しかないので、日本語の画面からは英語のページが開きます。
- 最初の画面にある提案のボタンは、外部から取得する文言です。英語で表示されます。
- AI エージェントが指示として読むファイル（`SKILL.md`、`AGENTS.md`、`.agents/`）は訳していません。訳すと、エージェントの動き方が変わるためです。
- [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) は、ライセンスの原文のまま残しています。

### 公式版と設定ファイルを共有するときの動き

ZCode-JP と公式版の ZCode は、同じ設定ファイルを読みます（`~/.zcode/v2/setting.json` と、CLI の設定ファイル）。公式版は `ja-JP` という値を知りません。この値があると、公式版は設定を読めなくなります。

そのため ZCode-JP は、言語の項目には公式版も読める `en-US` を書きます。日本語を選んだことは、公式版が無視する別の項目 `zcodeJpLocale` に記録します。公式版で言語を変えた場合は、そちらの選択が優先されます。

### ライセンス

ZCode-JP は、本家と同じ [Apache License 2.0](LICENSE) で配布します。上に書いた変更は veltrea が行いました。本家の [NOTICE.md](NOTICE.md)（日本語訳は [NOTICE.ja.md](NOTICE.ja.md)）も引き続き適用されます。

---

# ZCode

<div align="center">
  <img src="public/logo/icons/1024x1024.png" alt="ZCode" width="128" height="128" />
</div>
<p align="center">
  <a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=47ag983c-8fcb-4d6d-814b-5395193a712c&amp;qr_code=true">Feishu コミュニティ</a> ·
  <a href="https://discord.gg/z9aBcQXZQ3">Discord</a>
</p>

ZCode は、AI を使ってコードを書くための作業環境です。デスクトップ、ブラウザ、ターミナルの 3 つの画面から使えます。このリポジトリには、クライアント、バックエンドのサービス、共通の UI、Agent CLI とランタイムのソースコードが入っています。

## 更新履歴

- 2026-9-23: ZCode v3.14.3 に更新しました。

## 準備

Git、Node.js **24.14.0**、pnpm **10.33.2** をインストールします。ツールの版は [mise.toml](mise.toml) に書いてあるものが正しい値です。以下の開発とパッケージ作成のコマンドは、すべてリポジトリの最上位のディレクトリで実行します。

```bash
pnpm bootstrap
```

`pnpm bootstrap` は、ワークスペースの依存パッケージをインストールします。次に、デスクトップのランタイムが使うローカルの素材を用意し、`build:bootstrap` を実行します。

Agent CLI とランタイムのソースコードは [apps/zcode-cli/](apps/zcode-cli/) にあります。これは普通のディレクトリで、このリポジトリを clone すると一緒に入ります。別に取得する必要はありません。Git のサブモジュールを初期化する必要もありません。

ほかの準備とビルドのコマンドは次のとおりです。

| コマンド                       | 用途                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `pnpm install`                 | 依存パッケージをインストールします                                                                           |
| `pnpm prepare:desktop-runtime` | デスクトップのランタイムの素材を用意します。既定ではリモート用の素材も含みます                               |
| `pnpm prepare:remote-assets`   | リモート用のランタイムの素材だけを用意します                                                                 |
| `pnpm bootstrap:with-remote`   | 依存パッケージ、ローカル用とリモート用の素材を用意し、関係するパッケージを順にビルドします。デスクトップアプリの本体はまとめません |
| `pnpm build`                   | ワークスペースの各パッケージの build スクリプトを順に実行します。素材を用意する手順も含みます                 |

既定の `bootstrap` は、リモート用の素材を用意しません。ローカルでデスクトップ版を開発するときは、これで足ります。リモートのワークスペースを扱うときや、リモート配布用の素材を確かめるときは、対応する準備のコマンドを実行してください。

## 開発と使い方

### デスクトップ版

```bash
pnpm dev:desktop

# テスト環境を使う
pnpm dev:desktop:test
```

`pnpm dev:desktop` は、既定で `pnpm dev:desktop:prod` を実行します。これは本番用のサービス設定を使います。起動スクリプトは、ローカルのランタイムの素材を用意し、デスクトップ用の Agent をビルドします。そのあと Electron と、ソースの変更を監視する処理を起動します。

開発用のデータを別のディレクトリに置きたいときは、`ZCODE_DATA_BASE_DIR` を設定します。macOS / Linux での例は次のとおりです。

```bash
ZCODE_DATA_BASE_DIR="$HOME/.zcode-dev-home" pnpm dev:desktop:test
```

### Web 版の開発

Web やバックエンドのソースコードを直すときは、開発モードを使います。

```bash
pnpm dev:web

# バックエンドのワークスペースを指定する（macOS / Linux）
ZCODE_SERVER_WORKSPACE=/path/to/project pnpm dev:web
```

このコマンドは、Web の開発サーバー（既定は `http://localhost:5173`）とバックエンド（既定は `http://localhost:3030`）の両方を起動します。ブラウザでは Web の開発サーバーを開いてください。`/ws` と一般の `/api` へのリクエストは、ローカルのバックエンドへ中継されます。`/api/v1/oauth/token` だけは別に扱われ、設定した製品サービスへ中継されます。

Agent のソースコードを変えたときは、`pnpm --filter @zcode/cli... build` を実行して、サービスを起動し直します。配布物の全体を確かめるときは、下の「パッケージの作成」→「ZCode CLI の配布版」に書いてある方法で、配布物を展開して実行します。

### ZCode CLI の配布版

コマンドラインの配布版には、TUI、Web クライアント、Agent が入っています。これらはすべて 1 つの `zcode` コマンドから使います。引数を付けないと TUI が起動します。最初の引数が `--web` なら Web モードが起動します。それ以外の引数は、既存の Agent CLI にそのまま渡されます。どちらのモードも、Electron を使わずにローカルで動きます。

```bash
# 既定ではターミナルの画面（TUI）が起動する
zcode

# Web の画面を起動する
zcode --web

# プロジェクトとポートを指定し、ブラウザを自動では開かない
zcode --web --workspace /path/to/project --port 3030 --no-open

# CLI と Web の選択肢を表示する
zcode --help
zcode --web --help
```

Web モードは、今いるディレクトリをワークスペースとして使います。既定では `127.0.0.1` で待ち受け、トークンによる認証はしません。空いているポートを自分で選び、ブラウザを開きます。ターミナルに表示された URL を使ってください。サービスを止めるときは `Ctrl+C` を押します。LAN の中の別の機械から使うときは `--host 0.0.0.0` を指定します。ローカル以外のアドレスで待ち受けるときは、既定でアクセス用のトークンが作られます。その場合は、ターミナルに表示される、トークン付きの URL を使ってください。トークンは `--token` で指定できます。`--no-token` を付けると、トークンによる認証を無効にできます。

一般の Web サービスの HTTP の入口を直接起動するときは、`ZCODE_SERVER_AUTH_TOKEN` で API と WebSocket の認証を設定します。プログラムからサービスを作るときは、`authToken` という選択肢を使います。

ビルドの方法は、下の「パッケージの作成」を見てください。`pnpm build:zcode` は配布物を作るだけです。`PATH` にすでにある `zcode` を置き換えはしません。`zcode` コマンドが古いインストールや別の取得先を指したままのときは、確かめてください。macOS / Linux では `command -v zcode`、Windows では `where.exe zcode` で確かめられます。

### CLI のソースからの開発

TUI や Agent を開発するときは、ソースの入口を使います。

```bash
pnpm --filter @zcode/cli dev --help
pnpm --filter @zcode/cli dev

# CLI と、CLI が使うワークスペースのパッケージをビルドする
pnpm --filter @zcode/cli... build
node apps/zcode-cli/packages/cli/dist/zcode.cjs --help
```

この入口は Agent CLI を直接実行します。配布版の `--web` の切り替えは扱いません。Web の開発には `pnpm dev:web` を使ってください。1 つにまとめたコマンドを試すときは、下に書いてある、展開した `bin/zcode.mjs` を使ってください。

## 設定

最上位のディレクトリにある [.env.example](.env.example) に、サービスの URL とビルドの設定の例が書いてあります。必要に応じて `.env` にコピーしてください。手元だけで上書きしたい値は `.env.local` に書きます。デスクトップ版の開発環境は、`dev:desktop:test` か `dev:desktop:prod` で選びます。

| 設定項目                             | 用途                                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| `ZCODE_DATA_BASE_DIR`                | アプリのデータを置く基準のディレクトリです。データはその中の `.zcode/` に保存されます     |
| `ZCODE_SERVER_WORKSPACE`             | Web のバックエンドが使うワークスペースのパスです                                          |
| `ZCODE_BUILTIN_PROVIDER_CONFIG_FILE` | ローカルのプロバイダー設定ファイルのパスです。設定しないときは組み込みの設定を使います    |
| `ZCODE_DIST_BASE_URL`                | CLI の配布版のインストーラーが、ダウンロードに使う基準の URL です                         |

実行時に使う変数は、起動するコマンドの環境変数として明示して設定できます。クライアントに同梱される既定の設定については、[config/README.md](config/README.md) を見てください。

## パッケージの作成

著作権表示の生成、配布物の検査、各配布物のどこに著作権表示が入るかについては、[third-party/README.md](third-party/README.md) を見てください。

### デスクトップ版

```bash
pnpm bundle:desktop

# 対象の OS と CPU アーキテクチャを指定する
pnpm bundle:desktop -- --os win --arch x64

pnpm bundle:desktop -- --help
```

既定の対象は macOS の arm64 です。既定の出力先は `packages/desktop/dist/` です。`--os` には `mac`、`win`、`linux` のどれかを指定します。`--arch` には `x64` か `arm64` を指定します。パッケージの作成と署名には、対象の OS 用のツールと設定が必要です。

### ZCode CLI の配布版

`pnpm build:zcode` を実行すると、CLI/TUI、バックエンド、Web クライアントをビルドします。次に、TUI のネイティブライブラリ、worker、実行時の依存パッケージを集めて、配布物を組み立てます。配布物を実行するには、Node.js が必要です。`mise.toml` に書いてある版を使ってください。

パッケージを作る前に、ダウンロードの基準の URL を設定します。設定する場所は、`.env`、`.env.local`、プロセスの環境変数の `ZCODE_DIST_BASE_URL` のどれかです。`--base-url` で渡すこともできます。下の URL は仮の値です。公開するときは、自分の公開先の URL に置き換えてください。

```bash
pnpm build:zcode --base-url https://downloads.example.com/zcode/

# ZCODE_DIST_BASE_URL をすでに設定してあるとき
pnpm build:zcode

# すでにある Agent、バックエンド、Web のビルド結果をまとめ直す
pnpm build:zcode --skip-build

# 版、出力先などの選択肢を表示する
pnpm build:zcode --help
```

版は、既定では最上位の `package.json` の版になります。出力は `dist/zcode/` に書き出されます。

- `releases/<version>/zcode-<version>.tar.gz`: 実行用のパッケージです。
- `releases/<version>/sha256.txt`: チェックサムのファイルです。
- `latest.json` と `install.sh`: 版の一覧とインストーラーです。

このディレクトリを丸ごと、設定したダウンロードの基準の URL に置いてください。インストーラーはその URL から実行用のパッケージをダウンロードします。既定では `~/.zcode/runtime` にインストールし、`~/.local/bin` に `zcode` コマンドを作ります。これらのディレクトリは、それぞれ `ZCODE_DIST_HOME` と `ZCODE_DIST_BIN_DIR` で変えられます。

Lite 版を使っていた人は、新しいビルドのコマンド、環境変数、インストーラーに切り替えてください。インストールしても、Lite 版の古いディレクトリは消えません。会話のデータを移したり消したりもしません。

作ったパッケージを手元で試すときは、アップロードもインストールもせずに、展開してそのまま実行できます。

```bash
zcode_version=$(node -p "require('./dist/zcode/latest.json').version")
mkdir -p dist/zcode/debug
tar -xzf "dist/zcode/releases/$zcode_version/zcode-$zcode_version.tar.gz" \
  -C dist/zcode/debug
# 既定では TUI が起動する
node dist/zcode/debug/zcode/bin/zcode.mjs

# Web モードを起動する
node dist/zcode/debug/zcode/bin/zcode.mjs --web \
  --workspace "$PWD" --port 3030 --no-open
```

`http://127.0.0.1:3030` を開くと、全体の流れを確かめられます。このとき、1 つのバックエンドが Web のページを返し、Agent も動かします。ポートは空いている必要があります。`pnpm dev:web` がすでに動いているときは、別の `--port` を選んでください。

## リポジトリの構成

| ディレクトリ                                         | 担当するもの                                                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `packages/desktop`                                   | Electron の Main、Host、Renderer と、デスクトップ版のパッケージ作成                       |
| `packages/web`                                       | Web クライアント                                                                         |
| `packages/server`                                    | HTTP / WebSocket のサービスと、リモート接続                                              |
| `packages/zcode-server-cli`                          | サーバーを単体で起動する処理と、プロセスの管理                                           |
| `packages/ui`                                        | 共通の React コンポーネント、hooks、Zustand の状態                                        |
| `packages/services`                                  | 業務のサービスと、データの保存                                                           |
| `packages/shared`, `packages/rpc`, `packages/client` | 共通のプロトコルと型、RPC の仕組み、Agent のクライアント SDK                             |
| `packages/provider`, `packages/provider-node`        | プロバイダーの共通の機能と、Node での実装                                                 |
| `apps/zcode-cli`                                     | Agent CLI、TUI、ランタイム、ツール                                                        |
| `scripts`, `config`, `third-party`                   | ビルドと保守のスクリプト、組み込みの設定、第三者の著作権表示の素材                        |

## プロジェクトについての注意事項

機能と宣伝の範囲、保守の方針、実行とデータに関する危険、ライセンス、第三者の著作権の情報については、[NOTICE.ja.md](NOTICE.ja.md) を見てください。
