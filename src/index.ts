import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Importação das rotas
import authRoutes from './routes/auth.routes';
import pratoRoutes from './routes/prato.routes';
import votacaoRoutes from './routes/votacao.routes';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use(authRoutes);
app.use(pratoRoutes);
app.use(votacaoRoutes);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
