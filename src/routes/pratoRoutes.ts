import { Router } from 'express';
import {
  criarPrato,
  listarTodosPratos,
  listarPratosPorUsuario,
  atualizarPrato,
  deletarPrato,
  buscarPratosComFiltro
} from '../controllers/pratoController';

const router = Router();

router.post('/pratos', criarPrato);
router.get('/pratos', listarTodosPratos);
router.get('/pratos/usuario/:id_usuario', listarPratosPorUsuario);
router.put('/pratos/:id', atualizarPrato);
router.delete('/pratos/:id', deletarPrato);
router.get('/pratos/buscar', buscarPratosComFiltro);

export default router;
