const express = require('express');
const Autenticacao = require('../middlewares/autenticacao');
const VeiculoController = require('../controllers/veiculoController');

class VeiculosRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new VeiculoController
        let auth = new Autenticacao();
        this.#router.get('/listar', auth.usuarioEstaLogado, ctrl.listarView);
        this.#router.get('/cadastrar' , auth.usuarioEstaLogado, ctrl.cadastrarView)
        this.#router.post('/cadastrar', auth.usuarioEstaLogado, ctrl.cadastrar);
        this.#router.get('/informacao', auth.usuarioEstaLogado, ctrl.listarInformacaoView);
        this.#router.get("/filtrar/:termo/:filtro", auth.usuarioEstaLogado, ctrl.filtrar);
    }
}

module.exports = VeiculosRoute;