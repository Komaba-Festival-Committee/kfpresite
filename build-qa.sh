echo $(pwd)
rm -rf .output
mkdir -p .output/qa

echo "/ /77/ 301" > .output/qa/_redirects

bash -cx "cd 77;
rm -rf .nuxt .output node-modules;
pnpm i;
pnpm exec nuxt generate;"

cp -r 77/.output/public .output/qa/77

bash -cx "cd 76;
rm -rf .nuxt .output node-modules;
yarn install;
yarn generate:staging;"

cp -r 76/.output/public .output/qa/76

