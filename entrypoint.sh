#!/bin/sh

echo "Copying secret .env file if exists..."
if [ -f /etc/secrets/.env ]; then
  cp /etc/secrets/.env .env
else
  echo "No secret .env file found."
fi

echo "Building project..."
npm run build

echo "Running Prisma generate..."
npx prisma generate

echo "Running Prisma migrate deploy..."
npx prisma migrate deploy

echo "Running Prisma seed..."
npx prisma db seed

echo "Starting server..."
exec node dist/index.js
