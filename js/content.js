/*
 * All portfolio copy lives here, in English and Japanese.
 * Sourced from Peeya's CV (EN) and 職務経歴書 (JA).
 * Short UI strings are looked up by key; list data carries { en, ja } pairs.
 */
window.PORTFOLIO = {
  ui: {
    en: {
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.research': 'Research',
      'nav.skills': 'Skills',
      'nav.journey': 'Journey',
      'nav.contact': 'Contact',

      'hero.status': 'Software Engineer @ Techvify Japan',
      'hero.hello': 'Hello, I’m',
      'hero.sub': 'Binte Rahman',
      'hero.tagline': 'Backend specialist and AI engineer — APIs and server-side systems, LLM / RAG solutions, and PyTorch-based ML for medical imaging (first-author IEEE paper), from Fukuoka, Japan.',
      'hero.langs': 'English · Japanese (JLPT N3, works in Japanese) · বাংলা',
      'hero.cta1': 'See my work',
      'hero.cta2': 'Say hello',
      'hero.cvEn': 'Download CV (English)',
      'hero.cvJa': 'Download 職務経歴書 (Japanese)',
      'hero.location': 'Fukuoka, Japan',
      'hero.scroll': 'scroll',

      'about.eyebrow': '01 · About me',
      'about.title': 'Backend at heart, AI in hand.',
      'about.lead1': 'I’m a software engineer with <em>2+ years</em> of professional experience designing REST APIs and backends across <em>C#/.NET, Java/Spring, Python (FastAPI), Ruby on Rails and PHP/Laravel</em>, with cloud and DevOps work on AWS.',
      'about.lead2': 'Most recently I developed and migrated an <em>AI call-centre system from Azure to AWS</em> — LLM/RAG and voice conversational AI, a GitLab CI pipeline and Python test automation with an E2E harness. Before that, ~2 years of AI research on medical data at <em>Kyushu University</em>, including PyTorch-based MRI / X-ray image analysis.',
      'stat.years': 'years building production systems',
      'stat.stacks': 'backend stacks shipped to production',
      'stat.team': 'person team, working in Japanese',
      'stat.paper': 'author, IEEE conference paper',

      'exp.eyebrow': '02 · Experience',
      'exp.title': 'Where I’ve been building',
      'exp.earlier': 'Earlier experience & internships',

      'proj.eyebrow': '03 · Projects',
      'proj.title': 'Things I’ve helped ship',
      'proj.lead': 'From AI voice agents to waste-management APIs — a selection of production and research work.',
      'proj.all': 'All',
      'proj.team': 'team',

      'res.eyebrow': '04 · Research',
      'res.title': 'AI for medical & healthcare data',
      'res.org': 'Kyushu University · Graduate School of ISEE · Research Student (Master’s-equivalent) · Jun 2023 – Mar 2025',
      'res.lead': 'About two years of supervised research on AI-based diagnosis support (ML, DL, computer vision, LLM, RAG), continued part-time alongside work at Techvify until completion in March 2025.',
      'res.badge': '★ First author',

      'skills.eyebrow': '05 · Skills',
      'skills.title': 'My toolbox',

      'journey.eyebrow': '06 · Education & milestones',
      'journey.title': 'The path so far',
      'journey.certs': 'Certifications & awards',
      'journey.langs': 'Languages',

      'contact.eyebrow': '07 · Contact',
      'contact.title': 'Let’s build something <span class="gradient-text">lovely</span> together.',
      'contact.lead': 'Have a role, a project or just want to say hi? My inbox is always open.',
      'contact.name': 'Your name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send message 🌸',
      'contact.mail': 'Email me',
      'contact.based': 'Based in',
      'contact.opening': 'Opening your mail app…',
      'contact.invalid': 'Please fill in every field with a valid email.',

      'footer.made': 'Made with 🌸 in Fukuoka',

      'loader.fonts': 'loading fonts',
      'loader.scene': 'planting sakura trees',
      'loader.petals': 'letting petals fall',
      'loader.ready': 'ready ♡',
      'loader.no3d': '3D unavailable — showing 2D',
    },
    ja: {
      'nav.about': '自己紹介',
      'nav.experience': '職務経歴',
      'nav.projects': 'プロジェクト',
      'nav.research': '研究',
      'nav.skills': 'スキル',
      'nav.journey': '学歴・資格',
      'nav.contact': 'お問い合わせ',

      'hero.status': 'Techvify Japan 株式会社 在籍中',
      'hero.hello': 'はじめまして、',
      'hero.sub': 'ピーヤ ナディア ビンテ ラハマン',
      'hero.tagline': 'バックエンド・サーバーサイド開発を専門とし、AI（LLM・RAG・PyTorch による医用画像 ML・IEEE 国際会議論文の筆頭著者）まで手がけるAIエンジニアです。福岡を拠点に、設計から実装・テスト・運用まで一貫して担当しています。',
      'hero.langs': '英語 · 日本語（JLPT N3・日本語で業務遂行）· ベンガル語',
      'hero.cta1': '実績を見る',
      'hero.cta2': 'お問い合わせ',
      'hero.cvEn': '英文 CV をダウンロード',
      'hero.cvJa': '職務経歴書をダウンロード',
      'hero.location': '福岡・日本',
      'hero.scroll': 'スクロール',

      'about.eyebrow': '01 · 自己紹介',
      'about.title': 'バックエンドを軸に、AIまで。',
      'about.lead1': 'Techvify Japan 株式会社のシステムエンジニアとして（2024年6月〜現在）、<em>C#・.NET、Java・Spring、Python・FastAPI、Ruby on Rails、PHP・Laravel</em> による API 設計・実装、データベース設計、非同期処理、AWS 上でのシステム構築を担当してきました。',
      'about.lead2': '直近では <em>AI コールセンターシステム（Azure→AWS 移行）</em> にて、LLM（Amazon Bedrock・Claude）と RAG を用いた AI 対話機能やオペレーター転送機能、Python によるテスト自動化・E2E テストハーネスを実装。九州大学の研究生として約2年間、<em>医療データ・医用画像（MRI・X線）を活用した AI 研究</em>にも従事しました。',
      'stat.years': '年以上の実務開発経験',
      'stat.stacks': '種類のバックエンド技術で本番開発',
      'stat.team': '名規模のチームで日本語による開発',
      'stat.paper': '著者として IEEE 国際会議論文',

      'exp.eyebrow': '02 · 職務経歴',
      'exp.title': 'これまでの歩み',
      'exp.earlier': '入社前・研究期間中の開発経験（インターン）',

      'proj.eyebrow': '03 · プロジェクト',
      'proj.title': '携わったプロジェクト',
      'proj.lead': 'AI 音声対話から産業廃棄物管理 API まで。実務と研究で取り組んだ主なプロジェクトです。',
      'proj.all': 'すべて',
      'proj.team': '名',

      'res.eyebrow': '04 · 研究歴',
      'res.title': '医療・ヘルスケアデータ × AI',
      'res.org': '九州大学 システム情報科学府 · 研究生（修士課程相当） · 2023年6月〜2025年3月',
      'res.lead': '医療・ヘルスケアデータを活用した AI 診断支援に関する研究（ML・DL・医用画像解析・LLM・RAG）に、教授の指導のもとで約2年間従事。Techvify 入社後も業務と並行して研究を継続し、2025年3月に研究期間満了となりました。',
      'res.badge': '★ 筆頭著者',

      'skills.eyebrow': '05 · テクニカルスキル',
      'skills.title': '技術スタック',

      'journey.eyebrow': '06 · 学歴・資格・受賞',
      'journey.title': 'ここまでの道のり',
      'journey.certs': '資格・受賞歴',
      'journey.langs': '言語',

      'contact.eyebrow': '07 · お問い合わせ',
      'contact.title': '一緒に、<span class="gradient-text">素敵なもの</span>を作りましょう。',
      'contact.lead': 'お仕事のご相談やプロジェクトのお話など、お気軽にご連絡ください。',
      'contact.name': 'お名前',
      'contact.email': 'メールアドレス',
      'contact.message': 'メッセージ',
      'contact.send': '送信する 🌸',
      'contact.mail': 'メールを送る',
      'contact.based': '拠点',
      'contact.opening': 'メールアプリを開いています…',
      'contact.invalid': 'すべての項目を正しく入力してください。',

      'footer.made': '福岡より 🌸 を込めて',

      'loader.fonts': 'フォントを読み込み中',
      'loader.scene': '桜の木を植えています',
      'loader.petals': '花びらを舞わせています',
      'loader.ready': '準備完了 ♡',
      'loader.no3d': '3D 非対応 — 2D で表示します',
    },
  },

  roles: {
    en: ['Backend Specialist', 'AI Engineer', 'ML / DL Engineer', 'LLM & RAG Engineer', 'Cloud & DevOps on AWS'],
    ja: ['バックエンドスペシャリスト', 'AI エンジニア', 'ML・DL エンジニア', 'LLM・RAG エンジニア', 'AWS クラウド構築'],
  },

  stats: [
    { value: '2+', key: 'stat.years' },
    { value: '5', key: 'stat.stacks' },
    { value: '23', key: 'stat.team' },
    { value: { en: '1st', ja: '筆頭' }, key: 'stat.paper' },
  ],

  experience: [
    {
      date: { en: 'Jun 2026 – Present', ja: '2026年6月 〜 現在' },
      role: { en: 'Backend / AI Engineer', ja: 'バックエンド・AIエンジニア' },
      org: { en: 'Techvify Japan Co., Ltd. · In-house projects', ja: 'Techvify Japan 株式会社 · 社内開発プロジェクト' },
      points: {
        en: [
          'Real-estate property-management system (current): backend APIs and server-side logic in PHP/Laravel with MySQL schema design, plus integration with the AI call-centre system (team of 5).',
          'AI call-centre, Azure → AWS migration (Jun–Sep 2026): mainly responsible for backend/server-side design & development; built LLM/RAG (Amazon Bedrock, Claude) and voice conversational AI (Twilio ConversationRelay) with AI-dialogue and operator-transfer features.',
          'Provisioned AWS (RDS, S3, ECS, EC2), containerised with Docker and deployed to ECS; built a GitLab CI pipeline (lint, tests, security).',
          'Designed Python test-automation tooling and an E2E test harness; detected and fixed defects as part of quality validation.',
        ],
        ja: [
          '【現在】PHP・Laravel・MySQL による不動産物件情報管理システムのバックエンド開発（物件スキーマ設計、AI コールセンターとの連携開発を含む・5名チーム）。',
          'AI コールセンターシステムの Azure から AWS への移行開発・品質検証（2026年6月〜9月）。主にバックエンド・サーバーサイドの設計・開発を担当し、LLM（Bedrock・Claude）・RAG による AI 対話機能、音声パイプライン（Twilio ConversationRelay）連携、オペレーター転送機能を実装。',
          'AWS（RDS・S3・ECS・EC2 等）上のシステム構築、Docker によるコンテナ化・ECS へのデプロイ、GitLab CI（Lint・テスト・セキュリティ）パイプライン構築。',
          'Python によるテスト自動化ツール・E2E テストハーネスの設計・開発、不具合の検出・修正。',
        ],
      },
      tags: ['Python', 'LLM / RAG', 'AWS', 'Docker', 'Twilio', 'GitLab CI', 'PHP', 'Laravel', 'MySQL'],
    },
    {
      date: { en: 'Jun 2025 – May 2026', ja: '2025年6月 〜 2026年5月' },
      role: { en: 'Backend / Software Engineer (Dispatched)', ja: 'バックエンドエンジニア（派遣）' },
      org: { en: 'Seiko Electronics Co., Ltd. · via Techvify Japan', ja: 'Seiko Electronics 株式会社 · Techvify Japan より派遣' },
      points: {
        en: [
          'Developed C#/.NET REST APIs for “Sanpai”, an industrial waste-management platform; authored design specs, requirement specs and test plans in a 23-person team, communicating in Japanese.',
          'Earlier on the dispatch (Jun–Aug 2025, team of 8): built the push-notification backend for a mobile app in Ruby on Rails — delivery APIs, push-platform integration and async job queues — and developed app-side features in Java/Kotlin integrated with those APIs.',
        ],
        ja: [
          '産業廃棄物の収集・運搬・処理・追跡を一元管理するシステムにて、.NET（C#）による REST API 開発・設計書／仕様書／テスト計画書の作成、単体・結合テストを担当（2025年9月〜2026年5月・23名チーム、日本語でのコミュニケーション）。',
          '派遣当初（2025年6月〜8月・8名チーム）は、モバイルアプリの通知（プッシュ通知）システムを Ruby on Rails で開発。通知配信 API・プッシュ通知基盤連携・ジョブキューによる非同期処理に加え、アプリ側（Java・Kotlin）の開発とバックエンド API 連携も担当。',
        ],
      },
      tags: ['C#', '.NET', 'ASP.NET', 'REST API', 'Ruby on Rails', 'Java', 'Kotlin'],
    },
    {
      date: { en: 'Jun 2024 – May 2025', ja: '2024年6月 〜 2025年5月' },
      role: { en: 'Software Engineer', ja: 'システムエンジニア' },
      org: { en: 'Techvify Japan Co., Ltd. · In-house projects', ja: 'Techvify Japan 株式会社 · 社内開発プロジェクト' },
      points: {
        en: [
          'Emergency News Delivery System: scalable Python/Java backend on AWS Serverless for real-time news distribution.',
          'Delivered product websites end-to-end — React/Next.js frontends with Python/FastAPI backends.',
          'Built a CMS, a medical-information system and an e-learning website with Java/Spring, Thymeleaf, database design and Docker.',
        ],
        ja: [
          '緊急ニュース配信システム：Java ベースの処理を Python へ移行しながら、AWS Lambda（サーバーレス）でスケーラブルなバックエンドを構築。',
          'Next.js（React）・TypeScript と Python・FastAPI による製品紹介サイト等の WEB サイト開発。',
          'Java・Spring・Thymeleaf による CMS・医療情報管理システム・学習 WEB サイトの開発、DB 設計、Docker 環境構築。',        ],
      },
      tags: ['Python', 'Java', 'FastAPI', 'React', 'Spring', 'AWS Lambda', 'MySQL'],
    },
  ],

  earlier: [
    { en: 'Backend API intern — Horizon Technology (Python/FastAPI, PostgreSQL DB design)', ja: 'ホライズンテクノロジー株式会社 インターン — Python・FastAPI による API 開発、PostgreSQL の DB 設計', date: { en: 'Jan – Mar 2024', ja: '2024年1月〜3月' } },
    { en: 'Part-time SE — “Learning Map” tool for Kyushu University’s Education department', ja: '九州大学 教育学部門 — Learning Map（学習マップ）ツールの設計・開発（パートタイム）', date: { en: 'Aug 2023 – May 2024', ja: '2023年8月〜2024年5月' } },
    { en: 'Frontend dev intern — Kyushu University SocialTech Lab (web frontend & DB design)', ja: '九州大学 フロントエンド開発インターン — Web フロントエンド開発・DB 設計', date: { en: 'Oct 2022 – Mar 2023', ja: '2022年10月〜2023年3月' } },
    { en: 'Web dev intern — Uddog O Uddokta Japan (backend & API development)', ja: 'Uddog O Uddokta Japan ウェブ開発インターン — バックエンド・API 開発', date: { en: 'Feb – Jul 2022', ja: '2022年2月〜7月' } },
  ],

  filters: [
    { id: 'all', label: { en: 'All', ja: 'すべて' } },
    { id: 'ai', label: { en: 'AI / LLM', ja: 'AI・LLM' }, color: '#b48cff' },
    { id: 'backend', label: { en: 'Backend', ja: 'バックエンド' }, color: '#ff7aa2' },
    { id: 'fullstack', label: { en: 'Full-Stack', ja: 'フルスタック' }, color: '#ffa86b' },
    { id: 'cloud', label: { en: 'Cloud', ja: 'クラウド' }, color: '#6fc3b8' },
  ],

  projects: [
    {
      cats: ['ai', 'cloud', 'backend'], featured: true,
      name: { en: 'AI Call-Centre (Azure → AWS)', ja: 'AI コールセンターシステム' },
      kind: { en: 'LLM · RAG · Voice AI', ja: 'LLM・RAG・音声 AI' },
      desc: {
        en: 'Voice AI that answers customer enquiries from a knowledge base and escalates to a human operator when needed. Migrated from Azure to AWS (ECS, RDS, S3) with a GitLab CI pipeline, validated by Python test automation and an E2E harness.',
        ja: 'お客様の問い合わせに知識ベースから回答を生成し、AI が対応できない場合はオペレーターへ転送。Azure から AWS へ移行し、テスト自動化・E2E テストハーネスで品質を検証。',
      },
      stack: ['Bedrock · Claude', 'RAG', 'Twilio', 'ECS', 'GitLab CI'],
      meta: { date: '2026.06 – 09', team: 3 },
    },
    {
      cats: ['backend'],
      name: { en: 'Real-Estate Property Management', ja: '不動産物件情報管理システム' },
      kind: { en: 'Backend APIs', ja: 'バックエンド開発' },
      desc: {
        en: 'Backend APIs and MySQL schema for registering, managing and searching property listings — plus integrating the AI call-centre into the system.',
        ja: '物件データの登録・管理・検索を扱うサーバーサイド機能と MySQL スキーマを設計・実装。AI コールセンターとの連携（統合）機能も開発。',
      },
      stack: ['PHP', 'Laravel', 'MySQL', 'Docker'],
      meta: { date: '2026.09 –', team: 5 },
    },
    {
      cats: ['backend'],
      name: { en: 'Sanpai · Waste Management', ja: '産業廃棄物管理システム' },
      kind: { en: 'REST APIs', ja: 'REST API 開発' },
      desc: {
        en: 'Platform covering collection, transport, processing and tracking of industrial waste. REST APIs, design & test documents, unit and integration tests — all in Japanese.',
        ja: '産業廃棄物の収集・運搬・処理・追跡を一元管理。REST API 開発、設計書・仕様書・テスト計画書の作成、単体・結合テストを日本語で実施。',
      },
      stack: ['C#', '.NET', 'ASP.NET'],
      meta: { date: '2025.09 – 2026.05', team: 23 },
    },
    {
      cats: ['backend'],
      name: { en: 'Mobile Push-Notification Backend', ja: 'モバイルアプリ通知基盤' },
      kind: { en: 'Async · Job queues', ja: '非同期処理・ジョブキュー' },
      desc: {
        en: 'Notification delivery APIs, push-platform integration and asynchronous job-queue processing for a Java/Kotlin mobile app, plus app-side features — picked up Rails from scratch in weeks.',
        ja: 'Java・Kotlin 製モバイルアプリの通知配信 API・プッシュ通知基盤連携・ジョブキュー処理に加え、アプリ側の開発も担当。未経験の Rails を短期間でキャッチアップ。',
      },
      stack: ['Ruby on Rails', 'Job queue', 'Kotlin'],
      meta: { date: '2025.06 – 08', team: 8 },
    },
    {
      cats: ['cloud', 'backend'],
      name: { en: 'Emergency News Delivery', ja: '緊急ニュース配信システム' },
      kind: { en: 'Serverless', ja: 'サーバーレス' },
      desc: {
        en: 'Real-time news distribution backend — migrating Java processing to Python on a scalable AWS Lambda architecture.',
        ja: '緊急ニュースをリアルタイム配信。Java の処理を Python へ移行しながら、AWS Lambda によるスケーラブルな構成を構築。',
      },
      stack: ['Python', 'Java', 'AWS Lambda', 'Docker'],
      meta: { date: '2025.01 – 05', team: 5 },
    },
    {
      cats: ['ai'],
      name: { en: 'AI Diagnosis Support (Research)', ja: 'AI 診断支援ツール（研究）' },
      kind: { en: 'ML · DL · LLM · RAG', ja: 'ML・DL・LLM・RAG' },
      desc: {
        en: 'PyTorch models for MRI / X-ray classification and segmentation (fine-tuned pretrained CNNs, nnU-Net), ML/DL on clinical data, and an LLM + RAG diagnosis-support tool with vector search, embeddings and prompt tuning.',
        ja: '医用画像（MRI・X線）の分類・セグメンテーション向け PyTorch モデル（事前学習済みモデルのファインチューニング・nnU-Net）と、ベクトル検索・埋め込み・プロンプト設計を用いた LLM・RAG 診断支援ツールを開発。',
      },
      stack: ['Python', 'PyTorch', 'nnU-Net', 'pandas', 'Embeddings'],
      meta: { date: '2023.06 – 2025.03', team: null },
    },
    {
      cats: ['fullstack'],
      name: { en: 'Product Websites', ja: '製品紹介サイト・ホームページ' },
      kind: { en: 'Frontend + API', ja: 'フロント＋API' },
      desc: {
        en: 'Responsive product and company sites with Next.js/React + TypeScript frontends talking to Python/FastAPI backends.',
        ja: 'Next.js（React）・TypeScript によるレスポンシブなフロントエンドと、Python・FastAPI のバックエンド API を担当。',
      },
      stack: ['Next.js', 'TypeScript', 'FastAPI', 'MySQL'],
      meta: { date: '2024.06 – 12', team: 5 },
    },
    {
      cats: ['fullstack'],
      name: { en: 'Content Management System', ja: 'CMS（コンテンツ管理）' },
      kind: { en: 'Java · Spring', ja: 'Java・Spring' },
      desc: {
        en: 'Lets admins create, edit and publish articles, images and video easily. Thymeleaf frontend, Spring backend, DB design, Docker.',
        ja: '記事・画像・動画などを簡単に作成・編集・公開できる仕組み。Thymeleaf・Spring による開発、DB 設計、Docker 環境構築。',
      },
      stack: ['Spring', 'Thymeleaf', 'MySQL', 'Docker'],
      meta: { date: '2024.06 – 12', team: 5 },
    },
    {
      cats: ['fullstack'],
      name: { en: 'Medical Information System', ja: '医療情報管理システム' },
      kind: { en: 'Healthcare', ja: 'ヘルスケア' },
      desc: {
        en: 'Manages patient, appointment and medical-record data so clinics get safe, easy access to information.',
        ja: '患者情報・予約情報・医療記録を管理し、院内業務の効率化と医療データへの安全なアクセスを実現。',
      },
      stack: ['Spring', 'Thymeleaf', 'MySQL'],
      meta: { date: '2024.06 – 12', team: 10 },
    },
    {
      cats: ['fullstack'],
      name: { en: 'Learning Website & Learning Map', ja: '学習 WEB サイト・Learning Map' },
      kind: { en: 'EdTech', ja: '教育' },
      desc: {
        en: 'An online-course platform for teachers and students (Java/Spring APIs), plus the “Learning Map” tool built part-time for Kyushu University.',
        ja: '教師がオンラインコースを作成・共有できる学習サイト、および九州大学の Learning Map ツール開発。',
      },
      stack: ['Spring', 'API', 'Web'],
      meta: { date: '2023 – 2024', team: null },
    },
  ],

  phases: [
    { en: 'Collect, clean & preprocess medical data (pandas, NumPy)', ja: '医療データの収集・クレンジング・前処理（pandas・NumPy）' },
    { en: 'Design & optimise ML / DL models in PyTorch — MRI / X-ray classification (ResNet-50, DenseNet-121, ConvNeXt-Tiny; transfer learning & fine-tuning) and nnU-Net segmentation', ja: 'PyTorch による ML／DL モデルの設計・実装・最適化 — 医用画像（MRI・X線）の分類（ResNet-50・DenseNet-121・ConvNeXt-Tiny の比較・ファインチューニング）と nnU-Net によるセグメンテーション' },
    { en: 'Build an LLM + RAG diagnosis-support tool (vector search, embeddings, prompts)', ja: 'LLM・RAG による診断支援ツールの開発（ベクトル検索・埋め込み・プロンプト設計）' },
    { en: 'Quantitative evaluation (accuracy, recall) and iterative refinement', ja: '定量評価（精度・再現率等）と継続的な改善' },
  ],

  skills: [
    { name: { en: 'Backend & APIs', ja: 'バックエンド・API' }, icon: '🍡', items: ['REST API', 'Event-driven / async', 'C# / .NET', 'Java / Spring', 'Python / FastAPI', 'Ruby on Rails', 'PHP / Laravel', 'Async job queues'] },
    { name: { en: 'Generative AI / LLM', ja: '生成 AI・LLM' }, icon: '✨', items: ['LLM & RAG', 'Amazon Bedrock', 'Voice AI', 'AI agents', 'Prompt engineering', 'Embeddings', 'Vector search', 'LLMOps'] },
    { name: { en: 'Cloud & DevOps', ja: 'クラウド・インフラ' }, icon: '☁️', items: ['AWS (RDS, S3, Bedrock, ECS, EC2)', 'Serverless / Lambda', 'Docker', 'GitLab CI', 'Git', 'Linux', 'Twilio'] },
    { name: { en: 'Frontend', ja: 'フロントエンド' }, icon: '🎀', items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Thymeleaf', 'Kotlin / Java (Android)', 'Flutter', 'React Native'] },
    { name: { en: 'Machine Learning', ja: '機械学習' }, icon: '🧠', items: ['PyTorch', 'ML / DL models', 'Computer vision', 'Transfer learning', 'nnU-Net', 'NLP', 'Feature engineering', 'pandas', 'NumPy'] },
    { name: { en: 'Data & Practices', ja: 'DB・開発プラクティス' }, icon: '🌸', items: ['MySQL', 'PostgreSQL', 'Schema design', 'Test automation', 'E2E testing', 'System design', 'Tech docs', 'Agile'] },
  ],

  education: [
    {
      date: { en: 'Jun 2023 – Mar 2025', ja: '2023年6月 〜 2025年3月' },
      title: { en: 'Research Student (Master’s-equivalent)', ja: '研究生（修士課程相当）' },
      org: { en: 'Kyushu University · Graduate School of Information Science & Electrical Engineering', ja: '九州大学 大学院システム情報科学府' },
      icon: '🎓',
    },
    {
      date: { en: 'Sep 2022 – May 2023', ja: '2022年9月 〜 2023年5月' },
      title: { en: 'Japanese & IT Engineer Training', ja: '日本語・IT エンジニア研修' },
      org: { en: 'B-MEET (Bangladesh-Miyazaki) & B-JET (Bangladesh-Japan) ICT Engineers’ Training', ja: 'B-MEET（宮崎 ICT エンジニア教育研修）・B-JET 受講' },
      icon: '🗾',
    },
    {
      date: { en: 'Aug 2018 – Aug 2022', ja: '2018年8月 〜 2022年8月' },
      title: { en: 'B.Sc. in Computer Science & Engineering', ja: 'コンピュータ・サイエンス・アンド・エンジニアリング 学士' },
      org: { en: 'North South University, Bangladesh', ja: 'ノース・サウス大学（バングラデシュ）' },
      icon: '📚',
    },
  ],

  milestones: [
    { date: '2026.02', en: 'JLPT N3 passed — studying for N2 (exam Dec 2026)', ja: '日本語能力試験 JLPT N3 合格（N2 に向け学習中・2026年12月受験予定）' },
    { date: '2024', en: 'IEEE International Conference paper, first author', ja: 'IEEE 国際会議論文（筆頭著者）' },
    { date: '2023.05', en: 'B-JET (Bangladesh-Japan Engineering Training) completed', ja: 'B-JET（Bangladesh Japan Engineering Training）修了' },
    { date: '2022.12', en: '3ZERO Leadership Challenge Champion, Kyushu University', ja: '九州大学公認 3ZERO LEADERSHIP CHALLENGE チャンピオン' },
    { date: '2022.12', en: 'B-MEET ICT Engineer Training — Perfect Attendance', ja: 'B-MEET（宮崎 ICT エンジニア教育研修）皆勤賞' },
    { date: '2022.08', en: 'JLPT N4 passed', ja: '日本語能力試験 JLPT N4 合格' },
  ],

  languages: [
    { name: { en: 'English', ja: '英語' }, level: { en: 'C1 · fluent / business', ja: 'C1・ビジネスレベル' }, pct: 90 },
    { name: { en: 'Japanese', ja: '日本語' }, level: { en: 'JLPT N3 · reads & understands Japanese, works in Japanese daily · studying N2', ja: 'JLPT N3・日本語の読解・理解に支障なく、日常業務を日本語で遂行・N2 学習中' }, pct: 80 },
    { name: { en: 'Bengali', ja: 'ベンガル語' }, level: { en: 'Native', ja: '母語' }, pct: 100 },
    { name: { en: 'German', ja: 'ドイツ語' }, level: { en: 'A1 · basic', ja: 'A1・基礎' }, pct: 18 },
  ],
};
