"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.votoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.votoSchema = joi_1.default.object({
    id_prato: joi_1.default.number().required(),
    voto: joi_1.default.boolean().required(),
    ip_usuario: joi_1.default.string()
        .ip({ version: ['ipv4', 'ipv6'], cidr: 'optional' })
        .required(),
});
