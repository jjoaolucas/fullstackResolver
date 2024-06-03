const Database = require('../utils/database');
const Criptografia = require('../utils/criptografia');


const conexao = new Database();

class ServicoPrestadoModel {
    #sepr_id;
    #serv_id;
    #veiId;
    #veiModelo;
    #servDesc;
    #servValor;

    get sepr_id(){
        return this.#sepr_id;
    }

    set sepr_id(sepr_id) {
        this.#sepr_id = sepr_id;
    }

    get serv_id(){
        return this.#serv_id;
    }

    set serv_id(serv_id) {
        this.#serv_id = serv_id;
    } 
    
    get veiId(){
        return this.#veiId;
    }

    set veiId(veiId) {
        this.#veiId = veiId;
    } 
    get veiModelo(){
        return this.#veiModelo;
    }

    set veiModelo(veiModelo) {
        this.#veiModelo = veiModelo;
    } 
    get servDesc(){
        return this.#servDesc;
    }

    set servDesc(servDesc) {
        this.#servDesc = servDesc;
    } 
    get servValor(){
        return this.#servValor;
    }

    set servValor(servValor) {
        this.#servValor = servValor;
    } 
    
    constructor(sepr_id, serv_id, veiId,veiModelo, servDesc, servValor){
        this.#sepr_id = sepr_id;
        this.#serv_id = serv_id;
        this.#veiId = veiId;
        this.#veiModelo = veiModelo;
        this.#servDesc = servDesc;
        this.#servValor = servValor;
        
    }

    async listarFiltro(termo, filtro) {

        let sqlFiltro = "";
        if(termo != "") {
            if(filtro == "1") {
                termo = "%"+ termo +"%"
                sqlFiltro = ` where vei_modelo = ?`
            }
            else if(filtro == "2") {
                termo = "%"+ termo +"%"
                sqlFiltro = ` where serv_descricao = ?`
            }
        }

        let sql = `SELECT v.vei_modelo, s.serv_descricao FROM tb_servicosprestados sp INNER JOIN tb_veiculos v ON sp.vei_id = v.vei_id INNER JOIN tb_servicos s ON sp.serv_id = s.serv_id ${sqlFiltro} `;
        
        let valores = [];

        if(sqlFiltro != ""){
            valores.push(termo);
        }

        
        let rows = await conexao.ExecutaComando(sql, valores);
        let listaServ = [];

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaServ.push(new ServicoPrestadoModel(row ["sepr_id"], row["serv_id"], row["vei_id"], row["vei_modelo"], row["serv_descricao"], row["serv_valor"]));
        }

        return listaServ;
    }

    async listarAtendimentoView(){
        let sql =  "SELECT sp.sepr_id, v.vei_modelo, v.vei_marca, v.vei_ano, v.vei_kilometragem, s.serv_descricao, s.serv_valor FROM tb_servicosprestados sp INNER JOIN tb_veiculos v ON sp.vei_id = v.vei_id INNER JOIN tb_servicos s ON sp.serv_id = s.serv_id;"

        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new ServicoPrestadoModel(row ["sepr_id"], row["serv_id"], row["vei_id"], row["vei_modelo"], row["serv_descricao"], row["serv_valor"]));
        }

        return listaRetorno;
    }

    toJSON(){
        return {
            "sepr_id": this.#sepr_id,
            "serv_id": this.#serv_id,
            "veiId": this.#veiId,
            "veiModelo": this.#veiModelo,
            "servDesc": this.#servDesc,
            "servValor": this.#servValor,
        }
    }

}

module.exports = ServicoPrestadoModel;