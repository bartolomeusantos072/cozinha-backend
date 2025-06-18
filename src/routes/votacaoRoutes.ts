import { Router } from 'express';
import { registrarVoto, obterResultados } from '../controllers/votacaoController';

const router = Router();

router.post('/votacao', registrarVoto);
router.get('/votacao', obterResultados);

export default router;
