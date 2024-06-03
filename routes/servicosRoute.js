const express = require('express');
const Autenticacao = require('../middlewares/autenticacao');
const ServicoController = require('../controllers/servicoController');

class ServicosRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }
    constructor() {

        this.#router = express.Router();
        let ctrl = new ServicoController();
        let auth = new Autenticacao();
        this.#router.get('/listar', auth.usuarioEstaLogado,ctrl.listarView);
        this.#router.get('/cadastrar', auth.usuarioEstaLogado, ctrl.cadastrarServicoView);
        this.#router.post("/cadastrar", auth.usuarioEstaLogado, ctrl.cadastrar);
        this.#router.get('/registrar', auth.usuarioEstaLogado, ctrl.registrarView);
        this.#router.post('/registrar', auth.usuarioEstaLogado, ctrl.registrarServico);
        
    }
}

module.exports = ServicosRoute;