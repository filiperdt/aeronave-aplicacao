let output = '';

const renderOptionMarca = marcas => {
    for(let marca of marcas) {
        output += `<option value="${marca}">${marca}</option>`;
    }
}

export default marcas => {
    output += `
        <div id="divFormAeronave" style="width: 600px; margin: auto;">
            <form id="formCreateAeronave">
                <div class="campoFormAeronave">
                    <select class="form-select" id="formControlMarca" aria-label="Select marca">
                        <option value=-1 selected>Marca</option>
                        `;

                        renderOptionMarca(marcas);

                        output += `
                    </select>
                    <div id="erroMarca" class="divMensagemErro"></div>
                </div>
                <div class="campoFormAeronave">
                    <input class="form-control" id="formControlNome" name="formControlNome" placeholder="Aeronave"></input>
                    <div id="erroNome" class="divMensagemErro"></div>
                </div>
                <div class="campoFormAeronave">
                    <textarea class="form-control" id="formControlDescricao" name="formControlDescricao" placeholder="Descrição" rows="1"></textarea>
                    <div id="erroDescricao" class="divMensagemErro"></div>
                </div>
                <div class="divConteudoCentralizado">
                    <div class="campoFormAeronave divInlineWidth50">
                        <input class="form-control" type="number" id="formControlAno" name="formControlAno" placeholder="Ano" min="0"></input>
                        <div id="erroAno" class="divMensagemErro"></div>
                    </div>
                    <div class="campoFormAeronave divInlineWidth50">
                        <select class="form-select" id="formControlVendido" aria-label="Select vendido">
                            <option value=-1 selected>Vendido</option>
                            <option value='true'>Sim</option>
                            <option value='false'>Não</option>
                        </select>
                        <div id="erroVendido" class="divMensagemErro"></div>
                    </div>
                </div>
            </form>
            <div>
                <input type="submit" form="formCreateAeronave" class="btn btn-primary" value="Gravar"><!-- Este input é o submit do form, apesar de estar fora dele. Pode ser colocado em qualquer lugar dentro do DOM -->
            </div>
        </div>
    `;

    return output;
};