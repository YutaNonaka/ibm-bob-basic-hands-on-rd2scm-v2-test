// FAQデータ(元データ: qa.md の日本語訳)
// 太字は **太字**、インラインコードは `コード` の簡易記法で記述する。
var FAQ_CATEGORIES = [
  { id: 'general', label: '一般' },
  { id: 'usage', label: '使い方' },
  { id: 'advanced', label: '高度な機能' },
  { id: 'troubleshooting', label: 'トラブルシューティング' }
];

var FAQ_ITEMS = [
  // ===== 一般 =====
  {
    id: 'what-is-bob',
    category: 'general',
    question: 'Bobとは何ですか?',
    answer: [
      { type: 'p', text: 'Bobは、コードの作成、既存コードのリファクタリング、さまざまなタスクの実行を支援するAI搭載のコーディングパートナーです。カスタムモードやカスタム指示によって、Bobの機能を拡張できます。' }
    ]
  },
  {
    id: 'how-bob-works',
    category: 'general',
    question: 'Bobはどのように動作しますか?',
    answer: [
      { type: 'p', text: 'Bobは大規模言語モデル(LLM)を使ってリクエストを理解し、それを具体的な操作に変換します。次のことができます。' },
      {
        type: 'ul',
        items: [
          'プロジェクト内のファイルの読み取りと書き込み',
          'ターミナルでのコマンド実行',
          'インターネットの閲覧(有効にしている場合)',
          'Model Context Protocol(MCP)による外部ツールの利用'
        ]
      },
      { type: 'p', text: 'チャット画面から指示を出し、Bobが提案した操作を確認して承認します。' }
    ]
  },
  {
    id: 'what-bob-can-do',
    category: 'general',
    question: 'Bobは何ができますか?',
    answer: [
      { type: 'p', text: 'Bobは、次のようなさまざまなコーディング作業を支援できます。' },
      {
        type: 'ul',
        items: [
          '自然言語の説明からのコード生成',
          '既存コードのリファクタリング',
          'バグの修正',
          'ドキュメントの作成',
          'コードの説明',
          'コードベースに関する質問への回答',
          '繰り返し作業の自動化',
          '新しいファイルやプロジェクトの作成'
        ]
      }
    ]
  },
  {
    id: 'data-restrictions',
    category: 'general',
    question: 'Bobで処理してはいけないデータの種類はありますか?',
    answer: [
      { type: 'p', text: '次の種類のデータは、Bobで処理しないでください。' },
      {
        type: 'ul',
        items: [
          'SPI(機微な個人情報)',
          '個人の健康情報(PHI)',
          '輸出規制対象のデータ(ITAR、APP など)',
          '規制対象の金融データ(銀行口座番号、PAN、非公開の財務データ)'
        ]
      }
    ]
  },
  {
    id: 'risks',
    category: 'general',
    question: 'Bobを使うリスクは何ですか?',
    answer: [
      { type: 'p', text: 'Bobは強力なツールです。責任を持って使うことが重要です。次の点に注意してください。' },
      {
        type: 'ul',
        items: [
          '**Bobは間違えることがあります。**承認する前に、Bobが提案した変更を必ず注意深く確認してください。',
          '**Bobはコマンドを実行できます。**特に自動承認を使っている場合は、コマンドの実行を依頼する際に慎重になってください。'
        ]
      }
    ]
  },

  // ===== 使い方 =====
  {
    id: 'start-task',
    category: 'usage',
    question: '新しいタスクはどのように開始しますか?',
    answer: [
      { type: 'p', text: 'Bobパネルを開き、チャットボックスにタスクを入力します。Bobにしてほしいことを、明確かつ具体的に伝えてください。' }
    ]
  },
  {
    id: 'switch-modes',
    category: 'usage',
    question: 'モードはどのように切り替えますか?',
    answer: [
      { type: 'p', text: 'チャット入力エリアのドロップダウンメニューから別のモードを選択するか、`/` コマンドで特定のモードに切り替えます。' }
    ]
  },
  {
    id: 'tools',
    category: 'usage',
    question: 'ツールとは何ですか? どのように使いますか?',
    answer: [
      { type: 'p', text: 'ツールは、Bobがお使いのシステムとやり取りするための手段です。Bobはタスクを完了するために、適切なツールを自動的に選んで使います。ツールを直接呼び出す必要はありません。ツールが使われるたびに、承認または拒否を求められます。' }
    ]
  },
  {
    id: 'context-mentions',
    category: 'usage',
    question: 'コンテキストメンションとは何ですか?',
    answer: [
      { type: 'p', text: 'コンテキストメンションは、ファイル、フォルダー、問題など、プロジェクトに関する特定の情報をBobに伝える方法です。`@` 記号に続けて、指定したい対象を入力します(例: `@/src/file.ts`、`@problems`)。' }
    ]
  },
  {
    id: 'run-commands',
    category: 'usage',
    question: 'Bobは私のターミナルでコマンドを実行できますか?',
    answer: [
      { type: 'p', text: 'はい、Bobはコマンドを実行できます。コマンドの自動承認を有効にしていない限り、コマンドごとに承認を求められます。コマンドの自動承認は、細心の注意を払って行ってください。' }
    ]
  },
  {
    id: 'feedback',
    category: 'usage',
    question: 'Bobにフィードバックするにはどうすればよいですか?',
    answer: [
      { type: 'p', text: 'Bobが提案した操作を承認または拒否することで、フィードバックできます。追加のフィードバックは、フィードバック欄を使って伝えられます。' }
    ]
  },
  {
    id: 'customize',
    category: 'usage',
    question: 'Bobの動作をカスタマイズできますか?',
    answer: [
      { type: 'p', text: 'はい、いくつかの方法でBobをカスタマイズできます。' },
      {
        type: 'ul',
        items: [
          '**カスタム指示:**すべてのモードに適用する一般的な指示や、モード固有の指示を設定できます。',
          '**カスタムモード:**独自のプロンプトと一部のツール権限を持つ、オリジナルのモードを作成できます。',
          '**Bobルール:**プロジェクトのルートにある `.bob/rules/` フォルダーにMarkdownのルールファイルを作成して、追加のガイドラインを提供できます。',
          '**設定:**自動承認、差分編集など、さまざまな設定を調整できます。'
        ]
      }
    ]
  },
  {
    id: 'auto-approval',
    category: 'usage',
    question: 'Bobに自動承認の設定はありますか?',
    answer: [
      { type: 'p', text: 'はい、有効にすると操作を自動的に承認する設定がいくつかあります。' }
    ]
  },

  // ===== 高度な機能 =====
  {
    id: 'what-is-mcp',
    category: 'advanced',
    question: 'MCP(Model Context Protocol)とは何ですか?',
    answer: [
      { type: 'p', text: 'MCPは、Bobが外部サーバーと通信するためのプロトコルです。カスタムツールやリソースによって、Bobの機能を拡張できます。' }
    ]
  },
  {
    id: 'create-mcp',
    category: 'advanced',
    question: '独自のMCPサーバーを作成できますか?',
    answer: [
      { type: 'p', text: 'はい、独自のMCPサーバーを作成して、Bobにカスタム機能を追加できます。' }
    ]
  },

  // ===== トラブルシューティング =====
  {
    id: 'not-responding',
    category: 'troubleshooting',
    question: 'Bobが応答しません。どうすればよいですか?',
    answer: [
      {
        type: 'ul',
        items: [
          'APIキーが正しく、有効期限が切れていないことを確認してください。',
          'インターネット接続を確認してください。',
          'VS Codeを再起動してみてください。'
        ]
      }
    ]
  },
  {
    id: 'undo-changes',
    category: 'troubleshooting',
    question: 'Bobが意図しない変更を行いました。元に戻すにはどうすればよいですか?',
    answer: [
      { type: 'p', text: 'BobはVS Codeに組み込まれたファイル編集機能を使用します。標準の「元に戻す」コマンド(Ctrl/Cmd + Z)で変更を取り消せます。チェックポイントを使って、ファイルに加えられた変更を元に戻すこともできます。' }
    ]
  }
];
