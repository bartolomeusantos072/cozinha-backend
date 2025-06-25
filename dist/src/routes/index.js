"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const authRoutes_1 = __importDefault(require("./authRoutes"));
const pratoRoutes_1 = __importDefault(require("./pratoRoutes"));
const votacaoRoutes_1 = __importDefault(require("./votacaoRoutes"));
exports.default = [authRoutes_1.default, pratoRoutes_1.default, votacaoRoutes_1.default];
