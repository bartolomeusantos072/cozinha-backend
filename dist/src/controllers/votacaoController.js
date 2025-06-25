"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterResultados = exports.registrarVoto = void 0;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
const registrarVoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_prato, voto, ip_usuario } = req.body;
    try {
        const votoCriado = yield prisma.votacao_tb.create({
            data: {
                id_prato,
                voto,
                data_voto: new Date(),
                ip_usuario,
            },
        });
        return res.json({ message: 'Voto registrado com sucesso', voto: votoCriado });
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({ error: 'Você já votou neste prato hoje' });
        }
        console.error(error);
        return res.status(500).json({ error: 'Erro ao registrar voto' });
    }
});
exports.registrarVoto = registrarVoto;
const obterResultados = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield prisma.$queryRawUnsafe(`
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
    `);
        const resultadoConvertido = resultado.map(r => ({
            id_prato: r.id_prato,
            principal: r.principal,
            votos_sim: Number(r.votos_sim),
            votos_nao: Number(r.votos_nao),
        }));
        return res.json(resultadoConvertido);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar resultados' });
    }
});
exports.obterResultados = obterResultados;
