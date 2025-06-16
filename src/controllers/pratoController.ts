import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const criarPrato = async (req: Request, res: Response) => {
  const { dia, turno, principal, sobremesa, bebida, imagem, id_usuario } = req.body;

  try {
    const prato = await prisma.prato_tb.create({
      data: { dia, turno, principal, sobremesa, bebida, imagem, id_usuario }
    });

    res.status(201).json(prato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar prato' });
  }
};

export const listarTodosPratos = async (_req: Request, res: Response) => {
  try {
    const pratos = await prisma.prato_tb.findMany({ orderBy: { id_prato: 'asc' } });
    res.json(pratos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pratos' });
  }
};

export const listarPratosPorUsuario = async (req: Request, res: Response) => {
  const id_usuario = Number(req.params.id_usuario);

  try {
    const pratos = await prisma.prato_tb.findMany({ where: { id_usuario } });
    res.json(pratos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pratos' });
  }
};

export const atualizarPrato = async (req: Request, res: Response) => {
  const id_prato = Number(req.params.id);
  const { dia, turno, principal, sobremesa, bebida, imagem, id_usuario } = req.body;

  try {
    const pratoExistente = await prisma.prato_tb.findFirst({ where: { id_prato, id_usuario } });
    if (!pratoExistente) return res.status(404).json({ error: 'Prato não encontrado ou sem permissão' });

    const pratoAtualizado = await prisma.prato_tb.update({
      where: { id_prato },
      data: { dia, turno, principal, sobremesa, bebida, imagem }
    });

    res.json(pratoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar prato' });
  }
};

export const deletarPrato = async (req: Request, res: Response) => {
  const id_prato = Number(req.params.id);
  const { id_usuario } = req.body;

  try {
    const pratoExistente = await prisma.prato_tb.findFirst({ where: { id_prato, id_usuario } });
    if (!pratoExistente) return res.status(404).json({ error: 'Prato não encontrado ou sem permissão' });

    await prisma.prato_tb.delete({ where: { id_prato } });
    res.json({ message: 'Prato excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir prato' });
  }
};

export const buscarPratosComFiltro = async (req: Request, res: Response) => {
  const { id_usuario, data, nome } = req.query;

  try {
    const filtro: any = {};

    if (id_usuario) filtro.id_usuario = Number(id_usuario);
    if (data) filtro.dia = new Date(data as string);
    if (nome) {
      filtro.principal = {
        contains: nome as string,
        mode: 'insensitive'
      };
    }

    co
