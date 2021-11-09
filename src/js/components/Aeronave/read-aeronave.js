export default aeronave => {
    document.getElementById("divExibirAeronave").style.display = "show";
    let output = '';

    const vendido = aeronave.vendido? 'Sim' : 'Não';
    
    const atualizado = aeronave.updated === null? 
        `` : 
        `<p class="divInlineWidth50"><strong>Editado em:</strong><br>
        ${aeronave['updated']}</p>`;

    output += `
        <div id="conteudoPrincipal" style="width: 600px; margin: auto;">
            <div>
                <h2 class='titulo-h2'>Aeronave #${aeronave['id']}</h2>
            </div>
            <div>
                <div class="divConteudoCentralizado">
                    <p class="divInlineWidth50"><strong>Marca:</strong><br>
                    ${aeronave['marca']}</p>
                    <p class="divInlineWidth50"><strong>Ano:</strong><br>
                    ${aeronave['ano']}</p>
                </div>
                <div class="divConteudoCentralizado">
                    <p class="divInlineWidth50"><strong>Nome:</strong><br>
                    ${aeronave['nome']}</p>
                    <p class="divInlineWidth50"><strong>Vendido:</strong><br>
                    ${vendido}</p>
                </div>
                <div>
                    <p><strong>Descrição:</strong><br>
                    ${aeronave['descricao']}</p>
                </div>
                <div class="divConteudoCentralizado">
                    <p class="divInlineWidth50"><strong>Criado em:</strong><br>
                    ${aeronave['created']}</p>
                    ${atualizado}
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary" onClick='fnUpdateAeronaveRead(${aeronave.id})'>Editar</button>
                <button type="button" class="btn btn-primary" onClick='fnFecharDivDeExibicao()'>Fechar</button>
            </div>
        </div>
    `;

    return output;
}