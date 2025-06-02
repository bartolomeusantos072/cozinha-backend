import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

// GET /cozinheiras - retorna cozinheiras com seus pratos
app.get('/pratos', async (req, res) => {
  try {
    const pratos = await prisma.$queryRaw`
      SELECT * FROM prato_tb
      ORDER BY id_prato ASC
    `
    res.json(pratos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar pratos' })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
