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
exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, senha } = req.body;
    try {
        const novaCozinheira = yield prisma.cozinheira_tb.create({
            data: { nome, email, senha }
        });
        res.status(201).json({ message: 'Usuária criada', id_usuario: novaCozinheira.id_usuario });
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        console.error(error);
        res.status(500).json({ error: 'Erro interno' });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const cozinheira = yield prisma.cozinheira_tb.findUnique({ where: { email } });
        if (!cozinheira || cozinheira.senha !== senha) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        res.json({
            message: 'Login bem-sucedido',
            id_usuario: cozinheira.id_usuario,
            nome: cozinheira.nome,
            email: cozinheira.email
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
});
exports.signin = signin;
