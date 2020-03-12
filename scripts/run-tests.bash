set -e

cd "${0%/*}/.."

cd "server"
echo "Running server tests"
yarn jest

cd "../client"
echo "Running client tests"
yarn test --watchAll=false
exit 1

