document.addEventListener("DOMContentLoaded", function (){

    document.getElementById("btnCadastrarVeiculo").addEventListener("click", cadastrar);

    function limparValidacao(){
        document.getElementById("modelo").style["border-color"] = "#ced4da";
        document.getElementById("marca").style["border-color"] = "#ced4da";
        document.getElementById("ano").style["border-color"] = "#ced4da";
        document.getElementById("kilometragem").style["border-color"] = "#ced4da";
    }

    function cadastrar(){
        limparValidacao();
        let modelo = document.querySelector("#modelo").value;
        let marca = document.querySelector("#marca").value;
        let ano = document.querySelector("#ano").value;
        let kilometragem = document.querySelector("#kilometragem").value;

        let listaErros = [];

        if(modelo == ""){
            listaErros.push("modelo");
        }
        if(marca == ""){
            listaErros.push("marca");
        }
        if(ano == ""){
            listaErros.push("ano");
        }
        if(kilometragem == ""){
            listaErros.push("kilometragem");
        }

        if(listaErros.length == 0){

            let obj = {
                modelo: modelo,
                marca: marca,
                ano: ano,
                kilometragem: kilometragem,
            }

            fetch("/veiculos/cadastrar" , {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok) {
                    alert ("Veiculo cadastrado com sucesso!");
                    window.location.href="/veiculos/listar";
                }   
                else {
                    alert(r.msg);
                }
            })
        }
        else{
            //avisar sobre o preenchimento incorreto
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

});