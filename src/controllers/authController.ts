import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  try {
    const novaCozinheira = await prisma.cozinheira_tb.create({
      data: { nome, email, senha }
    });

    res.status(201).json({ message: 'Usuária criada', id_usuario: novaCozinheira.id_usuario });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const cozinheira = await prisma.cozinheira_tb.findUnique({ where: { email } });

    if (!cozinheira || cozinheira.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.json({
      message: 'Login bem-sucedido',
      id_usuario: cozinheira.id_usuario,
      nome: cozinheira.nome,
      email: cozinheira.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
