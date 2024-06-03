document.addEventListener("DOMContentLoaded" , function(){

    document.getElementById("btnRegistrarServico").addEventListener("click", cadastrar);

    function limparValidacao(){
        document.getElementById("veiculo").style["border-color"] = "#ced4da";
        document.getElementById("servico").style["border-color"] = "#ced4da";
    }

    function cadastrar(){
        limparValidacao();
        let veiculo = document.getElementById("veiculo").value;
        let servico = document.getElementById("servico").value;
        

        let listaErros = [];

        if(veiculo == "0"){
            listaErros.push("veiculo");
        }
        if(servico == "0"){
            listaErros.push("servico");
        }
       
        if(listaErros.length == 0){

            let obj = {
                veiculo: veiculo,
                servico: servico,
            }

            fetch("/servicos/registrar" , {
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
                    alert("Serviço Prestado REGISTRADO!")
                    window.location.href="/veiculos/informacao";
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

})