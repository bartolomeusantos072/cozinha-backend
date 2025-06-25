"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const votacaoController_1 = require("../controllers/votacaoController");
const router = (0, express_1.Router)();
router.post('/votacao', votacaoController_1.registrarVoto);
router.get('/votacao', votacaoController_1.obterResultados);
exports.default = router;
