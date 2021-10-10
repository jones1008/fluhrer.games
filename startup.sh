#!/bin/bash
MODE=$1

if [ "$MODE" != "dev" ] && [ "$MODE" != "prod" ]; then
    echo "ERROR: MODE env variable is not set to prod or dev"
    exit 1
fi

chmod -R +w ./
umask u=rwx,g=rwx,o=rwx

echo "INFO: executing npm install..."
npm install
echo ""

echo "INFO: executing bundle install"
bundle install
echo ""

if [ "$MODE" = "dev" ]; then
    echo "INFO: serving Jekyll..."
    bundle exec jekyll serve & grunt serve
else
    echo "INFO: building Jekyll..."
    bundle exec jekyll build && grunt
fi
