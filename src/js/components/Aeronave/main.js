import createAeronaveForm from './create-aeronave-form.js';
import pesquisarTermoAeronaveForm from './pesquisar-termo-form.js';

const capitalizeMarca = marca => marca[0].toUpperCase() + marca.substr(1).toLowerCase();

const fnGerarFormGravar = listMarcas => createAeronaveForm(listMarcas);

const fnQtdePorDecada = mapQtdePorDecada => {
    let output = ``;
    
    for(let key in mapQtdePorDecada){
        let stringAeronave = mapQtdePorDecada[key] == 1?' Aeronave<br>':' Aeronaves<br>';
        let stringDecada = key%100 == 0?'00':key%100;

        output += '<strong>Década ' + stringDecada + '</strong>: ' + mapQtdePorDecada[key] + stringAeronave;
    }

    return output;
};

const fnQtdePorMarca = mapQtdePorMarca => {
    let output = ``;

    output += '<strong>Marcas</strong><br>';
    
    for(let key in mapQtdePorMarca){
        output += capitalizeMarca(key) +': ' + mapQtdePorMarca[key] + '<br>';
    }

    return output;
};

const fnRegistradasUltimaSemana = qtdeRegistradasUltimaSemana => {
    let stringAeronave = qtdeRegistradasUltimaSemana == 1?' aeronave<br>':' aeronaves<br>';

    return '<strong>Essa semana</strong>: ' + qtdeRegistradasUltimaSemana + stringAeronave;
}

const fnQtdeNaoVendida = qtdeNaoVendida => {
    let stringAeronave = qtdeNaoVendida == 1?' aeronave<br>':' aeronaves<br>';

    return '<strong>Não vendidas</strong>: ' + qtdeNaoVendida + stringAeronave;
};

const gerarTemplate = (listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca, qtdeNaoVendida) => 
    `
        <div class="container mt-4">
            <div id="titulo" class="row">
                <h1>Gestão de Aeronaves</h1>
            </div>
            <div id="formCreate" class="row">
                ${fnGerarFormGravar(listMarcas)}
            </div>
            <div class="divConteudoCentralizado" style="margin-top: 15px">
                <div id="decada" class="row divInlineWidth50">
                    <p>${fnQtdePorDecada(mapQtdePorDecada)}</p>
                </div>
                <div id="essaSemana" class="row divInlineWidth50">
                    <p>${fnRegistradasUltimaSemana(qtdeRegistradasUltimaSemana)}</p>
                </div>
            </div>
            <div id="pesquisa" class="row mb-3" style="width: 300px;">
                ${pesquisarTermoAeronaveForm()}
            </div>
            <div id="divExibirAeronave" class="row">
            </div>
            <div id="todasAeronaves" class="row">
                ${tableListTodasAeronaves}
            </div>
            <div class="divConteudoCentralizado">
                <div id="marcas" class="row divInlineWidth50">
                    <p>${fnQtdePorMarca(mapQtdePorMarca)}</p>
                </div>
                <div id="naoVendida" class="row divInlineWidth50">
                    <p>${fnQtdeNaoVendida(qtdeNaoVendida)}</p>
                </div>
            </div>
        </div>
    `;

export default (listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca, qtdeNaoVendida) => {
    return gerarTemplate(listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca, qtdeNaoVendida);

}