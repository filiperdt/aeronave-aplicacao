export default () => {
    let output = '';
    
    output += `
        <div id="divFormPesquisarAeronaveTermo">
            <form id="formPesquisarAeronaveTermo">
                <div class="mb-2">
                    <input class="form-control" id="formControlTermo" name="formControlTermo" placeholder="Pesquisa por Modelo"></input>
                </div>
            </form>
            <div>
                <input type="submit" form="formPesquisarAeronaveTermo" class="btn btn-primary" onclick="fnPesquisarAeronaveFormAction()" value="Pesquisar"><!-- Este input é o submit do form, apesar de estar fora dele. Pode ser colocado em qualquer lugar dentro do DOM -->
            </div>
        </div>
    `;

    return output;
};