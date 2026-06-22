echo $(pwd)
rm -rf .output
mkdir -p .output/public

bash -cx "cd 77;
rm -rf .nuxt .output node-modules;
pnpm i;
pnpm exec nuxt generate;"

cp -r 77/.output/public .output/public/77

bash -cx "cd 76;
rm -rf .nuxt .output node-modules;
yarn install;
yarn generate:production;"

cp -r 76/.output/public .output/public/76

echo "/ /77/ 301" > .output/public/_redirects

