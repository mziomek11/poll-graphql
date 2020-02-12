set -e

cd "${0%/*}/.."

cd "server"
echo "Running server tests"
yarn jest

