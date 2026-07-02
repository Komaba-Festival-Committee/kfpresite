# kfpresite
プレサイトのmonorepo

# Generate static files in QA
```
bash build-qa.sh
```

# deploy to QA
```
npx wrangler pages deploy .output/qa --branch main --project-name=kfpresite-qa
```

# Generate static files in PROD
```
bash build-qa.sh
```

# deploy to PROD
# Verify there are no functions deployed
```
rm -rf functions # make sure the authorization function is not put in prod!
npx wrangler pages deploy .output/production --branch main --project-name=kfpresite-prod
git checkout functions
```
