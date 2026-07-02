echo $(pwd)
echo "Clear any previous output"
rm -rf .output
mkdir -p .output/production

echo "/ /77/ 301" > .output/production/_redirects

bash -cx "cd 77;
rm -rf .nuxt .output node-modules;
pnpm install --frozen-lockfile;
pnpm generate:production;"

bash -cx "cp -r 77/.output/public .output/production/77"

bash -cx "cd 76;
rm -rf .nuxt .output node-modules;
yarn install --frozen-lockfile;
yarn generate:production;"

bash -cx "cp -r 76/.output/public .output/production/76"
bash -cx "ls .output"
