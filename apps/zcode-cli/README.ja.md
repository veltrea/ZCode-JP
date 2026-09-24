**他の言語で読む:** [English](README.md)

# zcode-cli

TypeScript と Node.js 24.14.0 で作る CLI の出発点です。標準の成果物は、普通の Node CLI の一つにまとめたファイル（バンドル）です。SEA（Single Executable Application。Node.js 本体と一緒に一つの実行ファイルにする仕組み）は、選んで使える配布方法として残してあります。

## この構成にしている理由

- 実行時のコードは、本番用の依存パッケージを一つも持ちません。
- CLI は、引数の解析と端末の制御に Node の組み込み機能を使います。
- `npm run build` は `dist/zcode.cjs` を作ります。このファイルは Node.js 24.14.0 が入っている環境ならどこでも動きます。
- `npm run sea` は、同じバンドルを一つの実行ファイルに変換しようとします。
- ある環境で SEA が動かなくなっても、普通の CLI の成果物を代わりに使えます。

## コマンド

```sh
npm run bootstrap
npm run dev -- --help
npm run build
npm run start -- doctor --json
npm test
npm run sea
npm run sea -- --target linux-x64 --target win-x64
npm run sea -- --all
```

## プロジェクトのフォルダ構成

```txt
src/
  cli/       command parsing and process wiring
  core/      reusable runtime logic
  ui/        terminal UI layer
scripts/    build and optional SEA packaging scripts
tests/      subprocess-level CLI tests
```

各フォルダの役割は次のとおりです。

- `src/cli/`: コマンドの解析と、プロセスへのつなぎ込みです。
- `src/core/`: 使い回せる実行時の処理です。
- `src/ui/`: 端末の画面の層です。
- `scripts/`: ビルドと、選んで使う SEA の作成のためのスクリプトです。
- `tests/`: CLI を子プロセスとして動かして確かめるテストです。

## 初期設定（bootstrap）

リポジトリを複製（clone）したあとに `npm run bootstrap` を実行します。このコマンドは、手元の Node.js の版を確かめます。次に依存パッケージを入れます。最後にプロジェクト全体の検査を実行します。

## プラグインの開発

zcode のプラグインは、手元に置く一まとまりのファイル群です。プラグインは、スキル・独自のコマンド・MCP サーバーを追加できます。

プラグインの状態は `~/.zcode/cli/plugins` の下に置かれます。

- `cache/`: マーケットプレイス（プラグインの配布元）から入れたプラグインのコードと、変化しないファイルです。
- `data/<plugin-id>/`: プラグインが保持し続けるデータです。MCP サーバーは、実行中に出すものをここに書きます。プラグインのソースのフォルダには書きません。
- `marketplaces/zcode-plugins-official/`: 唯一の公式マーケットプレイスの情報です。同梱分と CDN（配信用のサーバー網）分の区画、およびそれらを合わせたメタデータ（プラグインの説明情報）が入っています。

このリポジトリは、組み込みの公式プラグインもワークスペースのパッケージとして同梱しています。同梱の Browser Use・Document Skills・Skill Creator・ZCode Guide の各プラグインは、最初から有効になっています。これらは `browser-use@zcode-plugins-official`、`document-skills@zcode-plugins-official`、`skill-creator@zcode-plugins-official`、`zcode-guide@zcode-plugins-official` として表示されます。動かすのに重い環境が要る公式プラグインもあります。手元のデータを移すためのプラグインもあります。例は `ios-simulator@zcode-plugins-official`、`android-emulator@zcode-plugins-official`、`restore-legacy-sessions@zcode-plugins-official` です。これらは zcode に見つけられますが、ユーザーが有効にするまで無効のままです。

```sh
zcode plugins list
zcode plugins enable ios-simulator
zcode plugins disable browser-use
zcode plugins enable restore-legacy-sessions
zcode plugins disable ios-simulator
```

手元でプラグインを開発するときは、プラグインを好きなフォルダに置きます。次に、そのフォルダをユーザー設定に追加します。手元のプラグインのフォルダは、その設定では最初から有効になります。

```json
{
  "plugins": {
    "enabled": true,
    "dirs": ["/absolute/path/to/my-plugin"]
  }
}
```

### プラグインの定義ファイル（マニフェスト）

MCP の設定は、`.zcode-plugin/plugin.json` の中に `mcpServers` として直接書けます。プラグインは `.mcp.json` とマニフェストの `mcpServers` の両方を持てます。同じサーバー名が両方にあるときは、選ばれたマニフェストの `mcpServers` が使われます。

今の zcode のプラグインで使える項目は次のとおりです。

- `name`、`version`、`description`、`author`、`license`
- `skills`: `SKILL.md` ファイルを含むフォルダです。相対パスで一つ、または複数指定します。
- `commands`: Markdown で書いた独自のコマンドを含むフォルダです。相対パスで一つ、または複数指定します。
- `mcpServers`: MCP サーバーの設定をその場に書いたものです。または、設定ファイルへの相対パスです。
- `userConfig`: 設定項目の既定値です。`${user_config.key}` の展開に使われます。

MCP の設定をその場に書いた `.zcode-plugin/plugin.json` の例です。

```json
{
  "name": "ios-simulator",
  "version": "0.1.0",
  "skills": "skills",
  "commands": "commands",
  "mcpServers": {
    "ios-simulator": {
      "command": "node",
      "args": ["${ZCODE_PLUGIN_ROOT}/dist/mcp/server.js"],
      "cwd": "${ZCODE_PROJECT_DIR}",
      "env": {
        "PLUGIN_DATA": "${ZCODE_PLUGIN_DATA}",
        "DEFAULT_DEVICE": "${user_config.default_device}"
      }
    }
  },
  "userConfig": {
    "default_device": {
      "type": "string",
      "default": "iPhone 16"
    }
  }
}
```

### 使える変数

プラグインの MCP 設定では、次の変数名を使えます。

- `${ZCODE_PLUGIN_ROOT}`
- `${ZCODE_PLUGIN_DATA}`
- `${ZCODE_PROJECT_DIR}`
- `${user_config.key}`
- `${ZCODE_SOME_ENV}`

環境変数は、名前が `ZCODE_` で始まるものだけが展開されます。変数が見つからないときは、その変数を使う MCP サーバーが無効になります。そのとき、プラグインの診断メッセージが出ます。

### 勧めるフォルダ構成

```txt
my-plugin/
  .zcode-plugin/plugin.json
  .mcp.json
  skills/
    my-skill/SKILL.md
  commands/
    my-command.md
  src/
```

zcode-cli 向けに MCP サーバーを作るときは、Node の普通のパッケージのビルドと `bin` の出力を使うことを勧めます。プロセス・ファイル・ネットワークへの作用（副作用）は、すべて MCP サーバーの中に閉じ込めてください。

## MCP の設定

zcode は、MCP サーバーの情報を主設定の JSON ファイルから読みます。ユーザー設定の既定の場所は `~/.zcode/cli/config.json` です。MCP の項目は `mcp.servers` の下に書きます。MCP は最初から有効です。そのため、`features.mcp` は、有効か無効かをはっきり指定したいときだけ書けば足ります。今の CLI は、有効なプラグインの外にある単独の `mcp.json` や `.mcp.json` を自動では探しません。

```json
{
  "features": {
    "mcp": true
  },
  "mcp": {
    "servers": {
      "filesystem": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
        "cwd": ".",
        "timeoutMs": 30000
      },
      "docs": {
        "type": "http",
        "url": "https://mcp.example.com/mcp",
        "headers": {
          "Authorization": "Bearer <token>"
        }
      },
      "legacy-sse": {
        "type": "sse",
        "url": "https://mcp.example.com/sse",
        "enabled": false
      }
    }
  }
}
```

使えるサーバーの種類は次のとおりです。

- `stdio`: `command` が必須です。`args`、`cwd`、`env`、`enabled`、`timeoutMs` を指定できます。`cwd` は、今の作業フォルダを基準に解決されます。サーバーのプロセスは zcode の環境変数を引き継ぎます。そこに `env` で指定した値が上書きされます。
- `http`: `url` が必須です。`headers`、`enabled`、`timeoutMs` を指定できます。
- `sse`: `url` が必須です。`headers`、`enabled`、`timeoutMs` を指定できます。

MCP のツールは、モデルへの最初の要求より前に登録されます。ツールは `mcp__<server>__<tool>` という名前で公開されます。CLI の中で `/mcp list`、`/mcp status`、`/mcp connect <server>`、`/mcp disconnect <server>` を使うと、設定したサーバーを今のセッションで確かめたり管理したりできます。

## フックの設定

zcode は、フック（決まった時点で自動的に実行される処理）を MCP と同じ主設定の JSON ファイルから読みます。このファイルは普通は `~/.zcode/cli/config.json` です。フックは最初は無効です。使うときは `hooks.enabled` を `true` にして、`hooks.events` の下にプロセスのフックを追加します。

使えるフックのイベントは次のとおりです。

- `SessionStart`: セッションの文脈が準備されたあと、最初の普通の入力がモデルに届く前に実行されます。文脈を追加できます。マッチャー（どの場合に実行するかを決める条件）には、`startup` や `resume` などの起動元が渡されます。
- `UserPromptSubmit`: ユーザーの入力がメッセージの履歴に書かれる前、またはモデルに送られる前に実行されます。`continue: false` で入力を止めることができます。文脈を追加することもできます。マッチャーには入力の文章がそのまま渡されます。
- `PreToolUse`: 手元（クライアント側）のツールが実行される前に実行されます。拒否する、確認を求める、許可する、ツールへの入力を置き換える、モデルに見える文脈を追加する、のどれかができます。マッチャーにはツール名が渡されます。
- `PermissionRequest`: ツールに承認が必要なときに実行されます。許可する、拒否する、権限を更新する、保留中のツールへの入力を変更する、のどれかができます。マッチャーにはツール名が渡されます。
- `PostToolUse`: ツールが成功したあと、ツールの結果がモデルに返る前に実行されます。文脈を追加できます。マッチャーにはツール名が渡されます。
- `PostToolUseFailure`: ツールが失敗したあと、失敗がモデルに返る前に実行されます。立て直しのための文脈を追加できます。マッチャーにはツール名が渡されます。
- `Stop`: 手元のツールをそれ以上呼ばずに、一回のやり取り（ターン）が終わろうとするときに実行されます。意見を追加し、`continue: true` でモデルにもう一段階の処理を求めることができます。中身が空の `continue: true` は無視されます。続行の繰り返しには上限があります。これは無限の繰り返しを防ぐためです。

例です。

```json
{
  "hooks": {
    "enabled": true,
    "timeoutMs": 60000,
    "maxOutputBytes": 32768,
    "events": {
      "SessionStart": [
        {
          "matcher": "startup|resume",
          "hooks": [
            {
              "type": "process",
              "command": "node",
              "args": ["./scripts/session-start-hook.mjs"]
            }
          ]
        }
      ],
      "PreToolUse": [
        {
          "matcher": "^(Bash|Write|Edit)$",
          "hooks": [
            {
              "type": "process",
              "command": "node",
              "args": ["./scripts/pre-tool-hook.mjs"],
              "timeoutMs": 5000
            }
          ]
        }
      ],
      "Stop": [
        {
          "hooks": [
            {
              "type": "process",
              "command": "node",
              "args": ["./scripts/stop-hook.mjs"]
            }
          ]
        }
      ]
    }
  }
}
```

設定の形は次のとおりです。

- `modelStream.idleTimeoutMs`: モデルから届く SSE のイベントどうしの間で、待つ時間の上限の初期値です。既定は `600000` です。
- `hooks.enabled`: 設定したフックを実行するかどうかです。既定は `false` です。
- `hooks.timeoutMs`: フックのプロセス一つごとの、時間切れまでの既定の時間です。既定は `60000` です。
- `hooks.maxOutputBytes`: フックのプロセスの stdout と stderr を取り込む量の上限です。既定は `32768` です。
- `hooks.events.<EventName>`: マッチャーのグループの配列です。グループは設定に書いた順に実行されます。
- `matcher`: 省略できます。JavaScript の正規表現の文字列です。省略すると、そのイベントのすべての入力に当てはまります。
- `hooks`: そのマッチャーのグループに属するプロセスのフックの一覧です。フックは順番に実行されます。
- `type`: 今は `process` だけが使えます。
- `command`: 実行するプログラムです。シェルの文字列としてではなく、引数の配列（argv）として実行されます。
- `args`: 省略できます。引数の配列です。
- `timeoutMs`: 省略できます。フックごとに時間切れの時間を上書きします。
- `statusMessage`: 省略できます。今後の画面表示に使う状態の表示名です。

プロセスのフックは、フックへの入力となる JSON を一つ、stdin から受け取ります。フックは stdout に JSON のオブジェクトを一つ書き出せます。stdout が空のときは、何もしなかったものとして扱います。次の場合は、フックの失敗として記録されます。stdout が JSON でない場合、stdout が決まった形式に合わない場合、時間切れの場合、終了コードが `2` 以外の 0 でない値の場合です。これらの失敗は、既定ではそのターンを止めません。終了コード `2` は、止める・拒否するという明示的な要求として扱います。

stdout に書く内容のよくある例です。

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Use the internal API migration checklist for this repository."
  }
}
```

```json
{
  "continue": false,
  "reason": "Do not run destructive shell commands in this workspace.",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Blocked by project hook."
  }
}
```

```json
{
  "continue": true,
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "additionalContext": "Before finalizing, verify that the answer mentions test coverage."
  }
}
```

## 配布物の作り方の方針

1. まず `npm run build` で普通の Node CLI のバンドルを作ります。
2. `npm run sea` は、既定では今使っている機械向けの実行ファイルを作ります。
3. 別の OS や CPU 向けの SEA を作るときは、`npm run sea -- --target <platform-arch>` または `npm run sea -- --all` を使います。
4. SEA の対象となる Node.js の実行ファイルは、今の `process.versions.node` に合う Node.js の公式リリースから取得します。取得したものは `SHASUMS256.txt` と照合して確かめます。
5. SEA で動くことが確かめられるまでは、ネイティブアドオン（C や C++ で書かれた拡張）と、実行時の動的な import を CLI の中心部分に入れないでください。
6. より高機能な TUI（端末の画面）のライブラリは、あとで追加します。そのときは、互換性を確かめる試作を先に行ってからにします。
