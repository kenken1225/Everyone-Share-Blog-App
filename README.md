# Everyone Share Your Blog!

スタートアップや個人のアイデアや気づきを投稿・共有できるWebアプリケーションです。

## 概要

ユーザーが自分のスタートアップアイデアを投稿し、他のユーザーと共有できるプラットフォームです。
Markdown形式で詳細なピッチを書くことができ、カテゴリ検索や閲覧数カウント機能も備えています。

## 使用技術

| カテゴリ         | 技術                          |
| ---------------- | ----------------------------- |
| フレームワーク   | Next.js 15 (App Router)       |
| 言語             | TypeScript                    |
| スタイリング     | Tailwind CSS                  |
| CMS              | Sanity                        |
| 認証             | NextAuth.js (GitHub / Google) |
| UIコンポーネント | Radix UI, shadcn/ui           |
| エラー監視       | Sentry                        |

## 主な機能

- ユーザー認証（GitHub / Google OAuth）
- ピッチ（記事）の作成・閲覧
- Markdownエディターでの記事執筆
- カテゴリ・キーワード検索
- 閲覧数のリアルタイムカウント
- ユーザープロフィールページ
- レスポンシブデザイン

## セットアップ

### 必要な環境

- Node.js 20以上
- npm 10以上
- Sanityアカウント
- GitHub OAuth App（認証用）
- Google OAuth App（認証用）

### 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の変数を設定：

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_write_token

# NextAuth
AUTH_SECRET=your_auth_secret

# GitHub OAuth
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

# Google OAuth
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

### Sanity Studioの設定

```bash
# Sanityにログイン
npx sanity login

# スキーマの型生成
npm run typegen
```

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリにアクセスできます。

### Sanity Studioへのアクセス

[http://localhost:3000/studio](http://localhost:3000/studio) でSanity Studioにアクセスし、コンテンツを管理できます。

## プロジェクト構成

```
├── app/                    # Next.js App Router
│   ├── (root)/            # メインページ群
│   │   ├── article/       # 記事関連ページ
│   │   ├── login/         # ログインページ
│   │   └── user/          # ユーザーページ
│   ├── api/               # APIルート
│   └── studio/            # Sanity Studio
├── components/            # Reactコンポーネント
│   ├── article/           # 記事関連
│   ├── auth/              # 認証関連
│   ├── common/            # 共通パーツ
│   ├── layout/            # レイアウト
│   ├── search/            # 検索関連
│   └── ui/                # UIパーツ
├── lib/                   # ユーティリティ
│   ├── actions/           # Server Actions
│   └── validations/       # バリデーション
├── sanity/                # Sanity設定
│   ├── lib/               # Sanityクライアント
│   └── schemaTypes/       # スキーマ定義
└── types/                 # 型定義
```
