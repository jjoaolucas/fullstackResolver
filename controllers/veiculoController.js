const VeiculoModel = require("../models/veiculoModel");
const ServicoModel = require("../models/servicoModel");
const ServicoPrestadoModel = require("../models/servicoPrestadoModel");


class VeiculoController {

    constructor() {

    }
    
    async listarView(req, res){
        var vei = new VeiculoModel()
        var lista = await vei.listar();
        res.render('veiculos/listar', { lista: lista  });
    }

    async filtrar(req, res){
        let termo = req.params.termo;
        let filtro = req.params.filtro;
        let servico = new ServicoPrestadoModel();
        var lista = await servico.listarFiltro(termo, filtro);

        res.send(lista);
    }

    async listarInformacaoView(req, res){
        var serv = new ServicoPrestadoModel();
        var lista = await serv.listarAtendimentoView();
        res.render('veiculos/informacao', { lista: lista });
    }

    async cadastrarView(req, res){
        res.render("veiculos/cadastrar")
    }

    async cadastrar(req, res){
        var msg = "";
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        if(req.body.modelo != "" && req.body.marca != "" && req.body.ano != "" && req.body.ano <= anoAtual && req.body.kilometragem != ""){
            let veiculo = new VeiculoModel(0, req.body.modelo, req.body.marca, req.body.ano, req.body.kilometragem);

            let result = await veiculo.cadastrar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Veiculo cadastrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar veiculo!"
                })
            }
        }
        else{
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }


}
module.exports = VeiculoController;