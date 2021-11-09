let output = '';

const renderOptionMarca = (listMarcas, marcaAtual) => {
    for(let marca of listMarcas) {
        if(marca === marcaAtual){
            output += `<option value="${marca}" selected>${marca}</option>`;
        }else{
            output += `<option value="${marca}">${marca}</option>`;
        }
    }
}

const renderOptionVendido = vendido => {
    if(vendido){
        output += `
            <option value='true' selected>Sim</option>
            <option value='false'>Não</option>
        `
    }else{
        output += `
            <option value='true'>Sim</option>
            <option value='false' selected>Não</option>
        `
    }
}

export default (aeronave, listMarcas) => {
    output += `
        <div id="divFormAeronaveUpdate" style="width: 600px; margin: auto;">
            <div>
                <h2 class='titulo-h2'>Editar aeronave #${aeronave['id']}</h2>
            </div>
            <form id="formUpdateAeronave">
                <div class="campoFormAeronave">
                    <select class="form-select" id="formControlMarcaUpdate" aria-label="Select marca">
                        <option value=-1>Marca</option>
                        `;

                        renderOptionMarca(listMarcas, aeronave.marca);

                        output += `
                    </select>
                    <div id="erroMarcaUpdate" class="divMensagemErro"></div>
                </div>
                <div class="campoFormAeronave">
                    <input class="form-control" id="formControlNomeUpdate" name="formControlNomeUpdate" value="${aeronave['nome']}" placeholder="Aeronave"></input>
                    <div id="erroNomeUpdate" class="divMensagemErro"></div>
                </div>
                <div class="campoFormAeronave">
                    <textarea class="form-control" id="formControlDescricaoUpdate" name="formControlDescricaoUpdate" placeholder="Descrição" rows="1">${aeronave['descricao']}</textarea>
                    <div id="erroDescricaoUpdate" class="divMensagemErro"></div>
                </div>
                <div class="divConteudoCentralizado">
                    <div class="campoFormAeronave divInlineWidth50">
                        <input class="form-control" type="number" id="formControlAnoUpdate" name="formControlAnoUpdate" value="${aeronave['ano']}" placeholder="Ano" min="0"></input>
                        <div id="erroAnoUpdate" class="divMensagemErro"></div>
                    </div>
                    <div class="campoFormAeronave divInlineWidth50">
                        <select class="form-select" id="formControlVendidoUpdate" aria-label="Select vendido">
                            <option value=-1>Vendido</option>
                            `;

                            renderOptionVendido(aeronave.vendido);

                            output += `
                        </select>
                        <div id="erroVendidoUpdate" class="divMensagemErro"></div>
                    </div>
                </div>
            </form>
            <div>
                <input type="submit" form="formUpdateAeronave" class="btn btn-primary" value="Salvar"><!-- Este input é o submit do form, apesar de estar fora dele. Pode ser colocado em qualquer lugar dentro do DOM -->
                <button type="button" class="btn btn-primary" onClick='fnFecharDivDeExibicao()'>Voltar</button>
            </div>
        </div>
    `;

    return output;
};