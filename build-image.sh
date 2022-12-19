#!/bin/sh

VERSION=$1

echo 'building PWA..'
cd app
npm install && npm run build
cd ..

echo 'dir '$(pwd)
echo 'built PWA. building backend in container..'
docker build -t budgeting:$VERSION .

echo 'succesfully built '$VERSION
