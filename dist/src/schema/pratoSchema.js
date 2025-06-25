"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pratoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.pratoSchema = joi_1.default.object({
    dia: joi_1.default.date().iso().required(),
    turno: joi_1.default.string().required(),
    principal: joi_1.default.string().required(),
    sobremesa: joi_1.default.string().required(),
    bebida: joi_1.default.string().required(),
    imagem: joi_1.default.string().uri().optional().allow('', null),
    id_usuario: joi_1.default.number().required(),
});
