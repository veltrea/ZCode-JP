import type { Locale, SkillScope } from "@zcode/shared";

interface SkillDisplayCandidate {
  name: string;
  description: string;
  path: string;
  scope: SkillScope;
  pluginName?: string;
}

const OFFICIAL_BUILTIN_PLUGIN_NAMES = new Set([
  "android-emulator",
  "browser",
  "browser-use",
  "document-skills",
  "documents",
  "pdf",
  "presentations",
  "spreadsheets",
  "ios-simulator",
  "skill-creator",
  "plugin-creator",
  "superpowers",
  "zcode-guide",
]);

const OFFICIAL_PLUGIN_PATH_MARKERS = [
  "/zcode-plugins-official/",
  "\\zcode-plugins-official\\",
  "/android-emulator-plugin/",
  "/browser-use-plugin/",
  "/document-skills-plugin/",
  "/documents-plugin/",
  "/pdf-plugin/",
  "/presentations-plugin/",
  "/spreadsheets-plugin/",
  "/ios-simulator-plugin/",
  "/skill-creator-plugin/",
  "/plugin-creator-plugin/",
  "/superpowers-plugin/",
  "/zcode-guide-plugin/",
];

const BUILTIN_SKILL_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  "android-dev": {
    "zh-CN": "通过 android-emulator MCP 工具构建、运行、检查并轻量自动化 Android 应用。",
    "en-US":
      "Build, run, inspect, and lightly automate Android apps through the android-emulator MCP tools.",
    "ja-JP":
      "android-emulator の MCP ツールを使って Android アプリをビルド、実行、確認し、簡単な自動化を行います。",
  },
  brainstorming: {
    "zh-CN":
      "在任何创造性工作前使用：创建功能、构建组件、增加能力或修改行为；先探索用户意图、需求和设计。",
    "en-US":
      "Use before any creative work, including creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements, and design before implementation.",
    "ja-JP":
      "機能の作成、コンポーネントの構築、能力の追加、動作の変更など、創造的な作業を始める前に使います。実装の前にユーザーの意図・要件・設計を確認します。",
  },
  "control-browser": {
    "zh-CN": "控制 ZCode 内置浏览器，用于打开、检查、点击、输入、截图或验证网页和本地开发页面。",
    "en-US":
      "Control ZCode's built-in browser to open, inspect, click, type, screenshot, or verify webpages and local development targets.",
    "ja-JP":
      "ZCode に内蔵されたブラウザを操作します。Web ページやローカルの開発中のページを開く、確認する、クリックする、入力する、スクリーンショットを撮る、検証するときに使います。",
  },
  "dispatching-parallel-agents": {
    "zh-CN": "面对 2 个以上彼此独立、无共享状态或顺序依赖的任务时使用。",
    "en-US":
      "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies.",
    "ja-JP": "状態を共有せず、順番に依存しない独立したタスクが 2 つ以上あるときに使います。",
  },
  docx: {
    "zh-CN":
      "完整的 DOCX 文档创建、编辑与分析能力，支持修订、批注、格式保持和文本提取。适用于创建新文档、修改内容、处理修订、添加批注或其它专业 Word 文档任务。",
    "en-US":
      "Create, edit, and analyze DOCX documents with revisions, comments, formatting preservation, and text extraction. Use for new documents, edits, revision handling, comments, and professional Word document work.",
    "ja-JP":
      "DOCX 文書の作成・編集・分析を行います。変更履歴・コメント・書式の保持・テキスト抽出に対応します。新規文書の作成、内容の修正、変更履歴の処理、コメントの追加など、Word 文書に関する作業全般に使います。",
  },
  "executing-plans": {
    "zh-CN": "已有书面实现计划，并要在带评审检查点的独立会话中执行时使用。",
    "en-US":
      "Use when you have a written implementation plan to execute in a separate session with review checkpoints.",
    "ja-JP":
      "書面の実装計画がすでにあり、レビューの節目を挟みながら別のセッションで実行するときに使います。",
  },
  "finishing-a-development-branch": {
    "zh-CN": "实现已完成、测试通过、需要决定如何合并、发 PR 或清理分支时使用。",
    "en-US":
      "Use when implementation is complete, tests pass, and you need to decide how to integrate the work through merge, PR, or cleanup.",
    "ja-JP":
      "実装が完了しテストも通っていて、マージ・PR の作成・ブランチの整理など、次の進め方を決めるときに使います。",
  },
  "ios-dev": {
    "zh-CN": "通过 ios-simulator MCP 工具构建、运行、检查并轻量自动化 iOS 模拟器应用。",
    "en-US":
      "Build, run, inspect, and lightly automate iOS Simulator apps through the ios-simulator MCP tools.",
    "ja-JP":
      "ios-simulator の MCP ツールを使って iOS シミュレーターのアプリをビルド、実行、確認し、簡単な自動化を行います。",
  },
  pdf: {
    "zh-CN":
      "专业 PDF 工具集，覆盖报告、创意视觉、学术 LaTeX 和现有 PDF 处理四条生产线。可按文档类型自动路由，支持报告、海报、论文、简历、提取、合并、拆分、表单填写和格式转换等任务。",
    "en-US":
      "Professional PDF toolkit for reports, creative visuals, academic LaTeX, and existing-PDF workflows. Supports reports, posters, papers, resumes, extraction, merge, split, forms, and conversion.",
    "ja-JP":
      "レポート・デザイン系のビジュアル・学術用 LaTeX・既存 PDF の加工に対応した PDF ツール集です。文書の種類に応じて自動で処理を振り分け、レポート・ポスター・論文・履歴書の作成、テキスト抽出、結合、分割、フォーム入力、形式の変換などに使えます。",
  },
  pptx: {
    "zh-CN":
      "检查并窄范围更新从 PPTX 预览区选择的元素。通过完整文件指纹和 OOXML 定位校验 shape 文本或表格单元格，冲突时停止而不猜测。",
    "en-US":
      "Inspect and narrowly update elements selected in PPTX Preview Pane. Verifies the whole-file fingerprint and OOXML locator for shape or table-cell text, and stops on conflicts instead of guessing.",
    "ja-JP":
      "PPTX のプレビュー画面で選択した要素だけを確認し、その範囲だけを更新します。ファイル全体のフィンガープリントと OOXML の位置情報でシェイプの文字や表のセルを検証し、食い違いがあれば推測せずに止まります。",
  },
  "receiving-code-review": {
    "zh-CN":
      "收到代码评审反馈、准备实现建议前使用；尤其当反馈不清楚或技术上可疑时，需要严谨验证而非盲目同意。",
    "en-US":
      "Use when receiving code review feedback before implementing suggestions, especially when feedback is unclear or technically questionable.",
    "ja-JP":
      "コードレビューの指摘を受け取り、対応を実装する前に使います。指摘があいまいだったり技術的に疑わしいときほど、鵜呑みにせずしっかり検証します。",
  },
  "requesting-code-review": {
    "zh-CN": "完成任务、实现重大功能或合并前，用于请求代码评审以确认满足需求。",
    "en-US":
      "Use when completing tasks, implementing major features, or before merging to verify work meets requirements.",
    "ja-JP":
      "タスクの完了時、大きな機能の実装後、またはマージの前に、要件を満たしているかを確認するためコードレビューを依頼するときに使います。",
  },
  "plugin-creator": {
    "zh-CN": "创建、校验 ZCode 插件，并指导本地安装与更新。",
    "en-US": "Create and validate ZCode plugins, and guide local installation and updates.",
    "ja-JP": "ZCode のプラグインを作成・検証し、ローカルへのインストールと更新の手順を案内します。",
  },
  "skill-creator": {
    "zh-CN":
      "创建新技能、编辑现有技能并迭代措辞。适用于从零编写 SKILL.md、改进已有技能、把重复工作流沉淀为可复用技能，或优化技能描述以提升触发可靠性。",
    "en-US":
      "Create new skills, edit existing skills, and iterate wording. Use for writing SKILL.md from scratch, improving skills, capturing repeated workflows, or tuning descriptions for reliable triggering.",
    "ja-JP":
      "新しいスキルの作成、既存スキルの編集、文言の調整を行います。SKILL.md をゼロから書く、既存スキルを改善する、繰り返し行う作業をスキルとして残す、呼び出しの精度を上げるために説明文を調整する、といった場面に使います。",
  },
  "subagent-driven-development": {
    "zh-CN": "在当前会话中执行包含独立任务的实现计划时使用。",
    "en-US":
      "Use when executing implementation plans with independent tasks in the current session.",
    "ja-JP": "独立したタスクを含む実装計画を、現在のセッション内で実行するときに使います。",
  },
  "systematic-debugging": {
    "zh-CN": "遇到任何 bug、测试失败或异常行为时，在提出修复前使用。",
    "en-US":
      "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes.",
    "ja-JP": "バグ・テストの失敗・想定外の動作に出会ったとき、修正を提案する前に使います。",
  },
  "test-driven-development": {
    "zh-CN": "实现任何功能或 bugfix 时，在编写实现代码前使用。",
    "en-US": "Use when implementing any feature or bugfix, before writing implementation code.",
    "ja-JP": "機能の実装やバグ修正を行うとき、実装コードを書く前に使います。",
  },
  "using-git-worktrees": {
    "zh-CN":
      "开始需要隔离的功能工作或执行实现计划前使用，确保存在隔离 workspace，优先使用原生工具，否则回退 git worktree。",
    "en-US":
      "Use when starting feature work that needs isolation or before executing implementation plans. Ensures an isolated workspace exists via native tools or git worktree fallback.",
    "ja-JP":
      "隔離が必要な機能開発を始めるとき、または実装計画を実行する前に使います。隔離されたワークスペースを用意し、まずネイティブのツールを優先し、無ければ git worktree にフォールバックします。",
  },
  "using-superpowers": {
    "zh-CN":
      "开始任何对话时使用；说明如何查找和使用技能，并要求在任何回复包括澄清问题前调用 Skill 工具。",
    "en-US":
      "Use when starting any conversation. Establishes how to find and use skills, requiring Skill tool invocation before any response including clarifying questions.",
    "ja-JP":
      "会話を始めるときに必ず使います。スキルの探し方と使い方を定め、確認の質問を含むどの返信の前にも Skill ツールの呼び出しを求めます。",
  },
  "verification-before-completion": {
    "zh-CN":
      "准备声明工作完成、已修复或测试通过前使用；要求先运行验证命令并确认输出，先有证据再下结论。",
    "en-US":
      "Use before claiming work is complete, fixed, or passing. Requires running verification commands and confirming output before success claims.",
    "ja-JP":
      "作業が完了した、修正できた、テストが通ったと伝える前に使います。成功を伝える前に、必ず検証コマンドを実行して出力を確認します。",
  },
  "web-gui-tester": {
    "zh-CN":
      "使用 ZCode Browser Use 对网页和本地 Web 前端执行纯 GUI 黑盒测试，通过真实用户交互、DOM 语义证据和截图验证功能、交互与响应式布局。",
    "en-US":
      "Run pure GUI black-box tests against websites and local web frontends with ZCode Browser Use, combining real user interactions, semantic DOM evidence, and inspected screenshots.",
    "ja-JP":
      "ZCode Browser Use を使い、Web ページやローカルの Web フロントエンドに対して画面操作だけのブラックボックステストを行います。実際のユーザー操作、DOM の意味情報、スクリーンショットを組み合わせて機能・操作・レスポンシブレイアウトを検証します。",
  },
  "writing-plans": {
    "zh-CN": "已有规格或多步骤任务需求，在动代码前用于编写实现计划。",
    "en-US":
      "Use when you have a spec or requirements for a multi-step task, before touching code.",
    "ja-JP":
      "仕様や複数ステップにわたるタスクの要件がすでにあり、コードに触れる前に実装計画を書くときに使います。",
  },
  "writing-skills": {
    "zh-CN": "创建新技能、编辑现有技能或在发布前验证技能是否有效时使用。",
    "en-US":
      "Use when creating new skills, editing existing skills, or verifying skills work before deployment.",
    "ja-JP":
      "新しいスキルを作成する、既存のスキルを編集する、公開前にスキルが正しく動くか確認するときに使います。",
  },
};

export function resolveSkillSourceLabel(scope: SkillScope, locale?: Locale): string {
  if (locale === "zh-CN") {
    if (scope === "workspace") return "工作区";
    if (scope === "plugin") return "插件";
    return "用户";
  }
  if (locale === "ja-JP") {
    if (scope === "workspace") return "ワークスペース";
    if (scope === "plugin") return "プラグイン";
    return "ユーザー";
  }
  if (scope === "workspace") return "Workspace";
  if (scope === "plugin") return "Plugin";
  return "User";
}

export function resolveSkillDisplayDescription(
  skill: SkillDisplayCandidate,
  locale?: Locale,
): string {
  const localized = isOfficialBuiltinSkill(skill)
    ? BUILTIN_SKILL_DESCRIPTIONS[skill.name]?.[locale ?? "en-US"]
    : undefined;
  return localized ?? skill.description;
}

function isOfficialBuiltinSkill(skill: SkillDisplayCandidate): boolean {
  if (skill.scope !== "plugin") {
    return false;
  }
  const pluginName = skill.pluginName?.trim();
  if (pluginName && OFFICIAL_BUILTIN_PLUGIN_NAMES.has(pluginName)) {
    return true;
  }
  const normalizedPath = skill.path.replaceAll("\\", "/");
  return OFFICIAL_PLUGIN_PATH_MARKERS.some((marker) => normalizedPath.includes(marker));
}
