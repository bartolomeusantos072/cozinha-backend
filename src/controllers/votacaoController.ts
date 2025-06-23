import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient();

export const registrarVoto = async (req: Request, res: Response) => {
  const { id_prato, voto, ip_usuario } = req.body;

  try {
    const votoCriado = await prisma.votacao_tb.create({
      data: {
        id_prato,
        voto,
        data_voto: new Date(),
        ip_usuario,
      },
    });

    return res.json({ message: 'Voto registrado com sucesso', voto: votoCriado });
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ error: 'Você já votou neste prato hoje' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Erro ao registrar voto' });
  }
};

interface ResultadoPrato {
  id_prato: number;
  principal: string;
  votos_sim: number;
  votos_nao: number;
}

export const obterResultados = async (_req: Request, res: Response) => {
  try {
    const resultado = (await prisma.$queryRawUnsafe(`
      SELECT
        p.id_prato,
        p.principal,
        COUNT(CASE WHEN v.voto = TRUE THEN 1 END) AS votos_sim,
        COUNT(CASE WHEN v.voto = FALSE THEN 1 END) AS votos_nao
      FROM prato_tb p
      LEFT JOIN votacao_tb v
        ON p.id_prato = v.id_prato
        AND DATE(v.data_voto) = CURRENT_DATE
      WHERE DATE(p.dia) = CURRENT_DATE
      GROUP BY p.id_prato, p.principal
      ORDER BY p.id_prato
    `)) as ResultadoPrato[];

    const resultadoConvertido = resultado.map((r) => ({
      id_prato: r.id_prato,
      principal: r.principal,
      votos_sim: Number(r.votos_sim),
      votos_nao: Number(r.votos_nao),
    }));

    return res.json(resultadoConvertido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar resultados' });
  }
};
