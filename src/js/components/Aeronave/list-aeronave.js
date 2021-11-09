let output = '';

const renderLine = aeronaves => aeronaves.forEach(aeronave => {
    const vendido = aeronave.vendido? `<i class="far fa-dot-circle" title='Vendido'></i>` : `<i class="far fa-circle" title='Não vendido'></i>`;

    output += `
        <tr>
            <th scope="row">${aeronave.id}</th>
            <td>${aeronave.marca}</td>
            <td>${aeronave.nome}</td>
            <td>${aeronave.ano}</td>
            <td align="center">${vendido}</td>
            <td><i class="fas fa-eye" id='btnReadAeronave' onclick='fnReadAeronave(${aeronave.id})' title='Exibir'></i></td>
            <td><i class="fas fa-pen" id='btnUpdateAeronave' onclick='fnUpdateAeronaveRead(${aeronave.id})' title='Editar'></i></td>
            <td><i class="fas fa-trash" id='btnDeleteAeronave' onclick='fnDeleteAeronave(${aeronave.id})' title='Excluir'></i></td>
        </tr>
    `;
});

export default aeronaves => {
    output = '';

    aeronaves.sort((a, b) => a.id < b.id ? -1 : a.id === b.id ? 0 : 1);

    output += `
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col" width="250">Marca</th>
                    <th scope="col" width="450">Modelo</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Vendido</th>
                    <th scope="col">Exibir</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody>
                `;

                renderLine(aeronaves);
                
                output += `
            </tbody>
        </table>
    `;

    return output;
}