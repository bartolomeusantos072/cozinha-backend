#!/bin/sh

echo "Copying secret .env file if exists..."
if [ -f /etc/secrets/.env ]; then
  cp /etc/secrets/.env .env
fi

echo "Running Prisma generate..."
npx prisma generate

echo "Running migrations..."
npx prisma migrate deploy

echo "Running seed..."
node dist/prisma/seed.js 

echo "Starting server..."
exec node dist/index.js
