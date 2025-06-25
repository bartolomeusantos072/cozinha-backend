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
exports.buscarPratosComFiltro = exports.deletarPrato = exports.atualizarPrato = exports.listarPratosPorUsuario = exports.listarTodosPratos = exports.criarPrato = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const criarPrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dia, turno, principal, sobremesa, bebida, imagem, id_usuario } = req.body;
    try {
        const prato = yield prisma.prato_tb.create({
            data: { dia, turno, principal, sobremesa, bebida, imagem, id_usuario }
        });
        res.status(201).json(prato);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar prato' });
    }
});
exports.criarPrato = criarPrato;
const listarTodosPratos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pratos = yield prisma.prato_tb.findMany({
            orderBy: { id_prato: 'asc' }
        });
        res.json(pratos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pratos' });
    }
});
exports.listarTodosPratos = listarTodosPratos;
const listarPratosPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_usuario = Number(req.params.id_usuario);
    try {
        const pratos = yield prisma.prato_tb.findMany({
            where: { id_usuario }
        });
        res.json(pratos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pratos' });
    }
});
exports.listarPratosPorUsuario = listarPratosPorUsuario;
const atualizarPrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_prato = Number(req.params.id);
    const { dia, turno, principal, sobremesa, bebida, imagem, id_usuario } = req.body;
    try {
        const pratoExistente = yield prisma.prato_tb.findFirst({
            where: { id_prato, id_usuario }
        });
        if (!pratoExistente) {
            return res.status(404).json({ error: 'Prato não encontrado ou sem permissão' });
        }
        const pratoAtualizado = yield prisma.prato_tb.update({
            where: { id_prato },
            data: { dia, turno, principal, sobremesa, bebida, imagem }
        });
        res.json(pratoAtualizado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar prato' });
    }
});
exports.atualizarPrato = atualizarPrato;
const deletarPrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_prato = Number(req.params.id);
    const { id_usuario } = req.body;
    try {
        const pratoExistente = yield prisma.prato_tb.findFirst({
            where: { id_prato, id_usuario }
        });
        if (!pratoExistente) {
            return res.status(404).json({ error: 'Prato não encontrado ou sem permissão' });
        }
        yield prisma.prato_tb.delete({
            where: { id_prato }
        });
        res.json({ message: 'Prato excluído com sucesso' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir prato' });
    }
});
exports.deletarPrato = deletarPrato;
const buscarPratosComFiltro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, data, nome } = req.query;
    try {
        const filtro = {};
        if (id_usuario) {
            filtro.id_usuario = Number(id_usuario);
        }
        if (data) {
            filtro.dia = new Date(data);
        }
        if (nome) {
            filtro.principal = {
                contains: nome,
                mode: 'insensitive'
            };
        }
        const pratos = yield prisma.prato_tb.findMany({
            where: filtro,
            orderBy: { id_prato: 'asc' }
        });
        res.json(pratos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pratos com filtro' });
    }
});
exports.buscarPratosComFiltro = buscarPratosComFiltro;
