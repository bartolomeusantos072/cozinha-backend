"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
// Importação das rotas
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const pratoRoutes_1 = __importDefault(require("./routes/pratoRoutes"));
const votacaoRoutes_1 = __importDefault(require("./routes/votacaoRoutes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3000;
// Middlewares globais
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use(authRoutes_1.default);
app.use(pratoRoutes_1.default);
app.use(votacaoRoutes_1.default);
// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
