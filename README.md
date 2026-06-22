# kfpresite
プレサイトのmonorepo

# Generate static files
bash build.sh

# deploy to QA
npx wrangler pages deploy .output/public --branch main --project-name=kfpresite-qa
