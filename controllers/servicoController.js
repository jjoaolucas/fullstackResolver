const ServicoModel = require("../models/servicoModel");
const ServicoPrestadoModel = require("../models/servicoPrestadoModel");
const VeiculoModel = require("../models/veiculoModel");

class ServicoController {

    constructor() {

    }
    
    async registrarView(req,res){
        var serv = new ServicoModel();
        var listaServico = await serv.listar();
        var vei = new VeiculoModel()
        var listaVeiculo = await vei.listar();

        res.render('servicos/registrar', { listaVeiculo: listaVeiculo, listaServico: listaServico})
    }

    async registrarServico(req, res) {
        let msg = "";
        if(req.body.veiculo != "0" && req.body.servico != "0"){
            let servico =  new ServicoModel();
            let result = await servico.registrarServico(req.body.veiculo, req.body.servico);

            if(result) {
                res.send({
                    ok: true,
                    msg: "Servico registrado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao registrar Servico!"
                });
            }
        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }

    async listarView(req, res){
        var serv = new ServicoModel();
        var lista = await serv.listar();
        res.render('servicos/listar', { lista: lista  });
    }

    async cadastrarServicoView(req, res){
        res.render('servicos/cadastro');
    }

    async cadastrar(req, res){
        let msg = "";
        if(req.body.desc != "" && req.body.valor != ""){
            let servico =  new ServicoModel(0,req.body.desc, req.body.valor);

            let result = await servico.cadastrar();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Servico cadastrado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao cadastrar Servico!"
                });
            }
        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }


}
module.exports = ServicoController;