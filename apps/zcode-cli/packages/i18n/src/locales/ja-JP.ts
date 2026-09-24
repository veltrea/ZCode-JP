import type { ZCodeCopy } from "../types.js";

export const jaJP: ZCodeCopy = {
  locale: "ja-JP",
  cli: {
    errors: {
      localeUnsupported: (value) =>
        `サポートされていない --locale の値です: ${value}。サポートされているロケール: en-US, zh-CN, ja-JP, auto。`,
    },
    help: (version) => `zcode ${version}

使い方:
  zcode [command] [options]

command を指定しない場合、zcode はフルスクリーン TUI を開きます。

コマンド:
  app-server ZCode Protocol の stdio app server を実行
  commands   カスタム slash command を一覧表示（\`commands list\`）
  doctor     実行環境とパッケージングの前提条件を確認
  login [zai|bigmodel]  ブラウザ認証でサインイン
  logout     共有の Z.AI ログイン認証情報を削除
  plugins    プラグインとマーケットプレイスを管理（\`plugins list|install|uninstall|enable|disable|update|validate|marketplace ...\`; エイリアス: plugin）
  skills     ローカルの skill を一覧表示（\`skills list\`）
  tui        ターミナル UI を開く
  version    CLI のバージョンを表示

オプション:
  -h, --help       ヘルプを表示
  -v, --version    バージョンを表示
  -p, --prompt <text>  TUI を開かずに単発の prompt を実行
  --enable-workflow  --prompt または --target で動的ワークフローを有効化（既定: 無効）
  --memory-bench   --prompt と併用し、自動 Memory 抽出を有効化して終了前に待機（Memory の有効化が必要）
  --browser-use <mode> Browser Use バックエンドを有効化（対応: headless）
  --surface <surface>  headless の prompt/app-server の表示面: terminal または desktop
  --browser-executable <path> headless Browser Use が使う Chrome/Chromium の実行ファイル
  --attach <path>  --prompt にローカルファイルを添付。複数指定可
  --cwd <path>     指定したディレクトリでこのコマンドを実行
  --disallowed-tools, --disallowedTools <tools...>
    今回の prompt/TUI 実行に限り、ツールを丸ごと除外します（保存済みの設定は変更されません）。
    カンマまたは空白区切りのツール名。例: "Bash Edit"。
    "Bash(git *)" は Bash 全体を除外します。コマンドのパターン一致はできません。
  --force-mcs      Anthropic provider 向けに mid-conversation system projection を強制
  --locale <locale>  UI ロケール: en-US, zh-CN, ja-JP, auto のいずれか
  --mode <mode>    prompt の権限モード: build, edit, plan, yolo のいずれか（--prompt の既定は yolo）
  --resume <sessionId>  sessionId を指定して保存済みセッションを再開（sess_...）
  --target <text>  headless モードでセッションの目標を実行または設定
  --target-replace --target で既存の目標を置き換える
  -c, --continue        現在のディレクトリの最新セッションを再開
  --json           対応しているコマンドで機械可読な JSON を出力
  --no-browser     ブラウザを開かず OAuth の URL を出力
  --no-color       ANSI カラーを無効化
  --verbose        追加の診断情報を出力

Slash Commands:
  /help [command]       slash command のヘルプを表示
  /login                Z.AI または BigModel のブラウザログインを選択
  /logout               共有の Z.AI ログイン認証情報を削除
  /compact [instructions]  現在の会話を圧縮
  /expert [status|resume|stop|<task>]  expert workflow を実行または管理
  /dwf [list|cancel|resume]  dynamic workflow run を一覧・キャンセル・再開
  /fork [latest|checkpointId]  workspace checkpoint から新しいセッションを分岐
  /mcp [list|status|connect|disconnect]  MCP server を表示または管理
  /mode [mode]          権限モードを表示または切り替え: build, edit, plan, yolo
  /model [id]           現在のセッションのモデルを表示または切り替え
  /new                  TUI で新しいセッションを開始
  /resume [sessionId]   sessionId を指定してセッションを再開。省略時は現在の cwd の最新セッション
  /rewind [latest|checkpointId]  最新の checkpoint を表示、またはワークスペースのファイルを復元
  /skill [name] [task]  skill を一覧表示、または次の prompt で特定の skill を強制読み込み
  /goal [action]        現在のセッションの目標を表示または設定
`,
  },
  tui: {
    copy: {
      copied: "選択したテキストをクリップボードにコピーしました。",
      failed: "選択したテキストをコピーできませんでした。",
      unavailable: "この端末ではテキストのクリップボードコピーを利用できません。",
    },
    effort: {
      disabled: "無効",
      enabled: "有効",
    },
    input: {
      activeStatusHint: "esc to interrupt",
      busyPlaceholder: "入力するとキューに追加されます",
      placeholder: "プロンプトを入力",
      queuedMore: (count) => `他 ${count} 件がキュー待ち`,
      queuedSubmitHint: "次のツール呼び出し後に送信されます。",
      queuedTitle: (count) => ` キュー (${count}) `,
      title: "入力",
      noHistorySource: "入力履歴のソースが設定されていません。",
      noPreviousInput: "このプロジェクトには過去の入力がありません。",
      restoredPreviousInput: "直前の入力を復元しました。",
      restoredPreviousInputWithAttachments: (count) =>
        `直前の入力を復元しました（添付ファイル ${count} 件）。`,
      restorePreviousInputFailed: "直前の入力を復元できませんでした。",
      typePrompt: "質問を入力して Enter を押してください。",
    },
    loginRequired: {
      help: "/model でモデルを確認するか、/login で Coding Plan アカウントに接続してください。",
      message: "利用可能なモデルがありません。プロバイダーを設定するか /login でサインインしてください。",
      status: "利用可能なモデルがありません。プロバイダーを設定するか /login でサインインしてください。",
      title: "モデルの設定が必要です",
    },
    loginSetup: {
      emptyMessage: "利用可能なログイン方法がありません。",
      help: "上下キーで選択し、Enter で決定します。",
      options: {
        bigmodelApiKey: {
          inputPrimary: "BigModel Coding Plan の API キーを入力",
          inputSecondary: "ここにキーを貼り付けてください。入力中は非表示になります。",
          primary: "BigModel Coding Plan API キー",
          secondary: "Coding Plan の API キーを手動で貼り付けます。",
        },
        bigmodelOauth: {
          pendingPrimary: "BigModel の認証を待っています",
          pendingSecondary:
            "ブラウザでサインインを完了してください。認証は自動的に検出されます。",
          primary: "BigModel Coding Plan",
          secondary: "ブラウザでログインを開きます。認証は自動的に検出されます。",
        },
        zaiApiKey: {
          inputPrimary: "Z.AI Coding Plan の API キーを入力",
          inputSecondary: "ここにキーを貼り付けてください。入力中は非表示になります。",
          primary: "Z.AI Coding Plan API キー",
          secondary: "Coding Plan の API キーを手動で貼り付けます。",
        },
        zaiOauth: {
          pendingPrimary: "Z.AI の認証を待っています",
          pendingSecondary: "ブラウザでサインインを完了してください。認証が完了すると続行します。",
          primary: "Z.AI Coding Plan",
          secondary: "ブラウザでログインを開き、Coding Plan の API キーを作成します。",
        },
      },
      pending: {
        cancelStatus: "ログインをキャンセルしました。設定方法を選択してください。",
        help: "Esc でキャンセルし、設定方法の選択に戻ります。",
        status: "ブラウザでの認証を待っています...",
      },
      input: {
        cancelStatus: "API キーの入力をキャンセルしました。設定方法を選択してください。",
        clearStatus: "API キーの入力をクリアしました。",
        emptyStatus: "API キーは必須です。",
        help: "Enter でキーを保存します。Esc で設定方法の選択に戻ります。",
        placeholder: "API キーを貼り付け",
        status: "API キーを入力して Enter を押してください。",
        submitStatus: "API キーを保存しています...",
      },
      prompt: "ログインまたは API キーの設定方法を選択してください。",
      response: "Coding Plan プロバイダーの設定方法を選択してください。",
      title: "Coding Plan を設定",
    },
    model: {
      requestFailed: (message) => `モデルへのリクエストに失敗しました: ${message}`,
      responseReceived: "モデルの応答を受信しました。",
      responseReceivedWithTokens: (tokens) => `モデルの応答を受信しました。${tokens} トークン。`,
      retryScheduled: ({ attempt, delay, maxAttempts, reason }) =>
        `モデルへのリクエストを ${delay} 後に再試行します (${attempt}/${Math.max(1, maxAttempts - 1)}): ${reason}`,
      streamStalled: "モデルのストリームが停止しました。",
    },
    sidebar: {
      subagents: {
        title: "サブエージェント",
        empty: "サブエージェントはまだありません。",
        emptyOutput: "まだ出力がありません。",
        back: "← メイン会話に戻る",
        readonly: "読み取り専用 · Esc で戻る",
        loading: "サブエージェントの出力を読み込んでいます...",
        unavailable: "サブエージェントの出力を利用できません。",
        retry: "再試行",
        more: "さらに読み込む",
        pendingMain: "メイン会話があなたの入力を待っています — 戻って応答してください",
        ended: (count) => `終了 (${count})`,
        status: {
          running: "実行中",
          waiting: "待機中",
          blocked: "ブロック中",
          success: "完了",
          failed: "失敗",
          cancelled: "キャンセル済み",
          lost: "ロスト",
        },
      },
      api: {
        empty: "まだ API 呼び出しがありません。",
        model: "モデル",
        more: (count) => `他 ${count} 件`,
        requests: "リクエスト",
        server: "サーバー",
      },
      cache: {
        hit: "ヒット",
        lastHit: "最終ヒット",
        lastMiss: "最終ミス",
        readWrite: ({ read, write }) => `読み取り ${read} / 書き込み ${write}`,
        total: "合計",
      },
      context: {
        cache: "キャッシュ",
        cacheReadWrite: "キャッシュ 読み書き",
        inputOutput: "入出力",
        reason: "理由",
        tokens: "トークン",
        used: "使用済み",
        window: "ウィンドウ",
      },
      modifiedFiles: {
        empty: "まだファイルの変更はありません。",
        more: (count) => `他 ${count} 件`,
      },
      mcp: {
        empty: "MCP server が設定されていません。",
        loadFailed: "MCP のステータスを取得できませんでした。",
        loading: "MCP のステータスを読み込んでいます...",
        more: (count) => `他 ${count} 件`,
        servers: "サーバー",
        status: {
          connected: "接続済み",
          connecting: "接続中",
          disabled: "無効",
          disconnected: "未接続",
          failed: "失敗",
          untrusted: "未信頼",
        },
        summary: ({ connected, total }) => `${connected}/${total} 接続済み`,
        tools: (count) => `${count} 個のツール`,
      },
      request: {
        complete: "完了",
        error: "エラー",
        errorWithStatus: (statusCode) => `エラー ${statusCode}`,
        pending: "処理中",
      },
      status: {
        last: "最終",
      },
      run: {
        draft: "下書き",
        draftChars: (count) => `${count} 文字`,
        draftEmpty: "空",
        messages: "メッセージ",
        mode: "モード",
        model: "モデル",
        provider: "プロバイダー",
        thought: "思考",
        trace: "トレース",
        turn: "ターン",
        workspace: "ワークスペース",
      },
      sections: {
        apis: "API",
        context: "コンテキスト",
        mcp: "MCP",
        modifiedFiles: "変更されたファイル",
        run: "実行",
        status: "ステータス",
        todos: "Todo",
      },
      shellSubtitle: "OpenTUI シェル",
      title: "サイドバー",
      todos: {
        empty: "まだ Todo がありません。",
        more: (count) => `他 ${count} 件`,
        progress: "進捗",
      },
    },
    status: {
      compactFailed: "コンテキストの圧縮に失敗しました。",
      compacted: "会話を圧縮しました。",
      compacting: "コンテキストを圧縮しています...",
      interruptedStreamDiscarded: "中断されたモデルのストリームを破棄しました。",
      modelCalling: "モデルを呼び出しています...",
      permissionRequested: (toolName) => `${toolName} の権限をリクエストしました。`,
      permissionResolved: (toolName) => `${toolName} の権限が処理されました。`,
      ready: "準備完了。",
      recoveringStream: "中断されたモデルのストリームを復旧しています...",
      retryingStream: "モデルのストリームを再試行しています...",
      sessionResumed: "セッションを再開しました。",
      targetChanged: (action) => `目標が${action}されました。`,
      thinking: "思考中...",
      toolCompleted: (toolName) => `ツール ${toolName} が完了しました。`,
      toolFailed: (toolName) => `ツール ${toolName} が失敗しました。`,
      toolPending: (toolName) => `ツール ${toolName} は保留中です。`,
      toolRunning: (toolName) => `ツール ${toolName} を実行中です。`,
      turnFailed: "このターンは失敗しました。",
    },
    terminal: {
      requiresInteractive: "TUI にはインタラクティブな端末が必要です。",
      starting: "ZCode を起動しています... Ctrl+C で終了",
    },
    transcript: {
      compact: {
        completed: "コンテキストを圧縮しました",
        failed: "コンテキストの圧縮に失敗しました",
        interrupted: "コンテキストの圧縮が中断されました",
        retry: (command) => `Ctrl-R で ${command} を再試行`,
        retrying: ({ attempt, maxAttempts }) =>
          maxAttempts > 0
            ? `コンテキストの圧縮を再試行しています (${attempt}/${maxAttempts})`
            : "コンテキストの圧縮を再試行しています",
        skipped: "コンテキストは最新です。圧縮は不要です",
        started: "コンテキストを圧縮しています",
      },
      roles: {
        agent: "Agent",
        system: "System",
        user: "User",
      },
      thought: {
        complete: "思考",
        thinking: "思考中...",
      },
      title: "トランスクリプト",
      workflow: {
        actors: "actors:",
        actorRow: ({ name, status }) => `${name} - ${status}`,
        usage: ({ spentTokens }) => `使用量: ${spentTokens} トークン`,
        collapsed: ({ label, status, nodesSettled, nodesTotal }) =>
          `ワークフロー ${label} - ${status} (${nodesSettled}/${nodesTotal} ステップ)`,
        error: (message) => `エラー: ${message}`,
        expandHint: "+ で展開",
        collapseHint: "- で折りたたむ",
        log: "ログ:",
        nodes: ({ nodesSettled, nodesTotal }) => `${nodesSettled}/${nodesTotal} ステップが確定`,
        result: (preview) => `結果: ${preview}`,
        status: {
          completed: "完了",
          errored: "エラー",
          pending: "保留中",
          running: "実行中",
          stopped: "停止済み",
        },
        stopReason: {
          user: "ユーザーによる停止",
          model: "エージェントによる停止",
          provider: "モデル側のエラー",
          interrupted: "プロセスが終了しました",
          superseded: "修正後の run に置き換えられました",
        },
        truncated: "(切り詰められています - 完全な履歴は run のジャーナルにあります)",
        interruptedNotice: ({ label, runId }) =>
          `ワークフロー ${label} は中断されました。再開できます: /dwf resume ${runId}`,
      },
    },
    selection: {
      defaultHelp: "Enter で選択、Esc でキャンセル",
      disabled: (reason) => ` [無効: ${reason}]`,
      filterLine: ({ filter, help }) =>
        `フィルター: ${filter || "-"} | ${help ?? "Enter で選択、Esc でキャンセル"}`,
      noFilter: "-",
    },
    fileMention: {
      empty: "一致するワークスペースのパスがありません。",
      loading: "ワークスペースのパスを読み込んでいます...",
      row: ({ path, selected }) => `${selected ? ">" : " "} ${path}`,
      title: "ファイル",
    },
    slash: {
      title: "コマンド",
      row: ({ name, selected, summary }) => `${selected ? ">" : " "} /${name}  ${summary}`,
    },
  },
};
