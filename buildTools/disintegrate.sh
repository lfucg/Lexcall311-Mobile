#!/bin/sh

# This is a script to remove the node modules and reinstall the node modules

set -e

# ensure we're at project root
echo "finding project root"
dir=$(dirname "$(readlink -f "$0")")
APP_DIR="$dir/../"
cd "${APP_DIR}"

# use nvm first so we have the right versions of stuff
echo "getting proper node version"
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
nvm use

# kill node_modules
echo "killing node_modules"
rm -rf node_modules

# now we're clean, we can install
echo "installing node_modules"
npm install

echo "fin!"
