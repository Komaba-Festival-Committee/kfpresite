# kfpresite
プレサイトのmonorepo

## 概要

このリポジトリは **Monorepo** 構成で管理されています。

Git Submodule を利用して、以下のプレサイトを管理しています。

- `76`：76のプレサイト
- `77`：77のプレサイト

## ディレクトリ構成

```text
.
├── 76/    # プレサイト（Git Submodule）
├── 77/    # プレサイト（Git Submodule）
└── ...
```
セットアップ
```text
git clone --recursive <repository-url>
```

既にクローン済みの場合は、以下を実行してください。

```text
git submodule update --init --recursive
```

Submodule の更新
```text
git submodule update --remote --recursive
```
備考

サブモジュール内で変更を行った場合は、各サブモジュール側でコミット・プッシュした後、本リポジトリ側でサブモジュールの参照コミットを更新してください。

# Deployment instructions

## Generate static files in QA
```
bash build-qa.sh
```

## deploy to QA
```
npx wrangler pages deploy .output/qa --branch main --project-name=kfpresite-qa
```

## Generate static files in PROD
```
bash build-qa.sh
```

## deploy to PROD
Verify there are no functions deployed
```
rm -rf functions # make sure the authorization function is not put in prod!
npx wrangler pages deploy .output/production --branch main --project-name=kfpresite-prod
git checkout functions
```


bad change
