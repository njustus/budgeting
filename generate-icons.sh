#!/bin/sh

convert -size 48 -define icon:auto-resize icon.svg app/public/favicon.ico
convert -size 512 icon.svg app/public/pwa-512x512.png
convert -size 192 icon.svg app/public/pwa-192x192.png
convert -size 180 icon.svg app/public/apple-touch-icon.png
