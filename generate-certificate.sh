#!/bin/sh

mkdir -p ./certs

openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 300 \
            -nodes \
            -out certs/budgeting.crt \
            -keyout certs/budgeting.key