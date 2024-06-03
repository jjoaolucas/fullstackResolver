document.addEventListener("DOMContentLoaded" , function(){

    document.getElementById("btnCadastrarServico").addEventListener("click", cadastrar);

    function limparValidacao(){
        document.getElementById("desc").style["border-color"] = "#ced4da";
        document.getElementById("valor").style["border-color"] = "#ced4da";
    }

    function cadastrar(){
        limparValidacao();
        let desc = document.querySelector("#desc").value;
        let valor = document.querySelector("#valor").value;

        let listaErros = [];

        if(desc == ""){
            listaErros.push("desc");
        }
        if(valor == ""){
            listaErros.push("valor");
        }
       
        if(listaErros.length == 0){

            let obj = {
                desc: desc,
                valor: valor,
            }

            fetch("/servicos/cadastrar" , {
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
                    alert ("Servico cadastrado com sucesso!");
                    window.location.href="/servicos/listar";
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