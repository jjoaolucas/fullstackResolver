document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel);


    let filtroEscolhido = 0;

    let itemFiltro = document.querySelectorAll(".itemFiltro");

    document.getElementById("btnFiltrar").addEventListener("click", buscar);

    for(let i = 0; i<itemFiltro.length; i++) {
        itemFiltro[i].addEventListener("click", mudarCriterioFiltragem);
    }

    function buscar() {
        let termoFiltro = document.getElementById("filtro").value;

        if(termoFiltro == ""){
            termoFiltro = "todos";
            filtroEscolhido = 0;
        }
            
        fetch(`/veiculos/filtrar/${termoFiltro}/${filtroEscolhido}`)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            //remontar tabela
           console.log(r);
           
            if(r.length > 0) {
                let htmlCorpo ="";
                for(let i = 0; i<r.length; i++) {
                    htmlCorpo += `
                                <tr>
                                    <td>${r[i].sepr_id}</td>
                                    <td>${r[i].veiModelo}</td>
                                    <td>${r[i].servDesc}</td>
                                    <td>R$${r[i].servValor}</td>
                                </tr>
                            `;
                }

                document.querySelector("#tabelaServicos > tbody").innerHTML = htmlCorpo;
            }
        })
    }

    function exportarExcel() {
        //chama a biblioteca para gerar o excel
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaServicos"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "relatorio-servicos.xlsx");
    }

    function mudarCriterioFiltragem() {
        let nome = this.dataset.nome;
        document.getElementById("btnEscolherFiltro").innerText = nome;
        filtroEscolhido = this.dataset.valor;
    }

})