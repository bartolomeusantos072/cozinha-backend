"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    nome: joi_1.default.string().min(1).required(),
    email: joi_1.default.string().email().required(),
    senha: joi_1.default.string().min(6).required(),
});
exports.signinSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    senha: joi_1.default.string().required(),
});
