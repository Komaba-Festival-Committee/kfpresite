echo $(pwd)
rm -rf .output
mkdir -p .output/production

echo "/ /77/ 301" > .output/production/_redirects

bash -cx "cd 77;
rm -rf .nuxt .output node-modules;
pnpm i;
pnpm generate:production;"

cp -r 77/.output/public .output/production/77

bash -cx "cd 76;
rm -rf .nuxt .output node-modules;
yarn install;
yarn generate:production;"

cp -r 76/.output/public .output/production/76
