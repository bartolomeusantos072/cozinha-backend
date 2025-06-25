#!/bin/bash

set -e

echo "Criando pastas..."
mkdir -p src

# --- MODIFICAÇÃO AQUI: Criando package.json com scripts ---
echo "Inicializando package.json com scripts..."
cat <<EOF > package.json
{
  "name": "projetoDockerBackEnd",
  "version": "1.0.0",
  "main": "dist/index.js",
  "license": "MIT",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc"
  }
}
EOF
# --- FIM DA MODIFICAÇÃO ---

echo "Instalando dependências de produção..."
yarn add axios express typescript @prisma/client prisma
echo "Instalando dependências de desenvolvimento..."
yarn add -D typescript ts-node-dev prisma @types/node @types/express


cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "src/tests/**/*.ts"]
}
EOF

# Criar tsconfig.build.json
cat <<EOF > tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "src/tests/**/*.ts"]
}
EOF

echo "Criando .env..."
cat <<EOF > .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cantina"
EOF

npx prisma init



echo "Criando src/index.ts..."
cat <<EOF > src/index.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API rodando!');
});

app.listen(port, () => {
  console.log(\`Servidor rodando na porta \${port}\`);
});
EOF

echo "🎉 Estrutura criada com sucesso! Rode 'yarn dev' para iniciar o servidor."

#DESENVOLVIMENTO
# Iniciar todos os serviços do ambiente de desenvolvimento (app + banco)
docker compose -f docker-compose.dev.yml up

# Buildar e subir os containers para desenvolvimento (com rebuild)
# sudo docker compose -f docker-compose.dev.yml up --build

# Seed de dados no container da aplicação (rodar script de seed)
# sudo docker exec -it backend-app npx prisma db seed

# Sincronizar schema com banco (puxar estrutura do banco para schema.prisma)
# sudo docker exec -it backend-app npx prisma db pull

# Gerar Prisma Client
# sudo docker exec -it backend-app npx prisma generate

# Resetar migrações (apaga dados e recria tudo) - só para desenvolvimento
# sudo docker exec -it backend-app npx prisma migrate reset

# Iniciar somente o banco de dados
# sudo docker compose -f docker-compose.dev.yml up db

# Acessar o banco de dados PostgreSQL no container
# sudo docker exec -it postgres-db psql -U postgres -d cantina

# Esperar alguns segundos para o Postgres ficar pronto antes de subir app
# sudo docker compose -f docker-compose.dev.yml up --build app

#PRODUCAO
# Iniciar a aplicação em produção (normalmente apenas o serviço app, sem banco local)
docker compose -f docker-compose.yml up

# Build e deploy em produção
# sudo docker compose -f docker-compose.yml up --build

# Importar schema manualmente no banco externo (exemplo: via psql)
# sudo docker exec -i postgres-db psql -U postgres -d cantina < db/schema.sql

# Aplicar migrações no banco remoto via prisma migrate deploy
# sudo docker exec -it backend-app npx prisma migrate deploy
