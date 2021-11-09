import * as options from './modules/Aeronave/options.js';
import index from './components/Aeronave/main.js';
import list from './components/Aeronave/list-aeronave.js';
import readAeronave from './components/Aeronave/read-aeronave.js';
import updateAeronaveForm from './components/Aeronave/update-aeronave-form.js';

let main = document.querySelector("#root");

var pathAeronave = 'http://localhost:8080/aeronave/aeronaves';

const fnIndex = () => {
    fnListarMarcas();
};

const fnListarMarcas = () => {
    const url = pathAeronave + '/marcas';
    fetch(url, options.optionsGetPadrao)
    .then(data => data.json())
    .then(listMarcas => {
        fnListarQtdePorDecada(listMarcas);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListarMarcas: ${e}`));
}

const fnListarQtdePorDecada = listMarcas => {
    const url = pathAeronave + '/quantidade-por-decada';
    fetch(url, options.optionsGetPadrao)
    .then(data => data.json())
    .then(mapQtdePorDecada => {
        fnContarQtdeRegistradasUltimaSemana(listMarcas, mapQtdePorDecada);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListarQtdePorDecada: ${e}`));
}

const fnContarQtdeRegistradasUltimaSemana = (listMarcas, mapQtdePorDecada) => {
    const url = pathAeronave + '/registradas-ultima-semana';
    fetch(url, options.optionsGetPadrao)
    .then(data => data.json())
    .then(qtdeRegistradasUltimaSemana => {
        fnListAeronave(listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana);
    })
    .catch(e => console.log(`Ocorreu um erro. fnContarQtdeRegistradasUltimaSemana: ${e}`));
}

const fnListAeronave = (listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana) =>
    fetch(pathAeronave, options.optionsListAeronaves)
    .then(data => data.json())
    .then(aeronaves => {
        const tableListTodasAeronaves = list(aeronaves);
        fnListarQtdePorMarca(listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListAeronave: ${e}`));

const fnListarQtdePorMarca = (listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves) => {
    const url = pathAeronave + '/quantidade-por-marca';
    fetch(url, options.optionsGetPadrao)
    .then(data => data.json())
    .then(mapQtdePorMarca => {
        fnContarQtdeNaoVendida(listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListarQtdePorMarca: ${e}`));
}

const fnContarQtdeNaoVendida = (listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca) => {
    const url = pathAeronave + '/quantidade-nao-vendida';
    fetch(url, options.optionsGetPadrao)
    .then(data => data.json())
    .then(qtdeNaoVendida => {
        fnMontarIndex(listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca, qtdeNaoVendida);
    })
    .catch(e => console.log(`Ocorreu um erro. fnContarQtdeNaoVendida: ${e}`));
}

const fnMontarIndex = (listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca, qtdeNaoVendida) => {
    main.innerHTML = index(listMarcas, mapQtdePorDecada, qtdeRegistradasUltimaSemana, tableListTodasAeronaves, mapQtdePorMarca, qtdeNaoVendida);

    removeElementosComIdsRepetidos('divFormAeronave');

    fnCreateAeronaveFormAction();
};

// CREATE
const fnCreateAeronaveFormAction = () => {
    const elemento = document.querySelector('#formCreateAeronave');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnCreateAeronaveBody();
    });
};

const fnCreateAeronaveBody = () => {
    const marca = document.querySelector('#formControlMarca').value;
    const nome = document.querySelector('#formControlNome').value;
    const descricao = document.querySelector('#formControlDescricao').value;
    const ano = document.querySelector('#formControlAno').value;
    const vendido = document.querySelector('#formControlVendido').value;
    
    const createBody = {
        marca: marca,
        nome: nome,
        descricao: descricao,
        ano: ano,
        vendido: vendido
    }

    fnCreateAeronave(createBody);
};

const fnCreateAeronave = createBody => 
    fetch(pathAeronave, options.optionsCreateAeronave(createBody))
    .then(data => data.json())
    .then(aeronave => {
        [].forEach.call(document.getElementsByClassName("divMensagemErro"), div => div.style.display = 'none');

        if(aeronave.erro){
            gerarMensagensDeErro(aeronave);
        }else{
            fnIndex();
        }
    })
    .catch(e => console.log(`Ocorreu um erro. fnCreateAeronave: ${e}`));

// READ
const fnReadAeronave = id => {
    const url = pathAeronave + '/' + id;
    fetch(url, options.optionsReadAeronave)
    .then(data => data.json())
    .then(aeronave => {
        let divExibirAeronave = document.getElementById("divExibirAeronave");
        
        divExibirAeronave.innerHTML = '';
        divExibirAeronave.style.display = "inline";
        divExibirAeronave.innerHTML = readAeronave(aeronave);
    })
    .catch(e => console.log(`Ocorreu um erro. fnReadAeronave: ${e}`))
};

// UPDATE
const fnUpdateAeronaveRead = id => {
    const url = pathAeronave + '/' + id;
    fetch(url, options.optionsReadAeronave)
    .then(data => data.json())
    .then(aeronave => {
        fnListarMarcasUpdate(aeronave);
    })
    .catch(e => console.log(`Ocorreu um erro. fnUpdateAeronaveRead: ${e}`));
};

const fnListarMarcasUpdate = aeronave => {
    const url = pathAeronave + '/marcas';
    fetch(url, options.optionsGetPadrao)
    .then(data => data.json())
    .then(listMarcas => {
        fnUpdateAeronaveForm(aeronave, listMarcas);
    })
    .catch(e => console.log(`Ocorreu um erro. fnListarMarcasUpdate: ${e}`));
}

const fnUpdateAeronaveForm = (aeronave, listMarcas) => {
    let divExibirAeronave = document.getElementById("divExibirAeronave");
        
    divExibirAeronave.innerHTML = '';
    divExibirAeronave.style.display = "inline";
    divExibirAeronave.innerHTML = updateAeronaveForm(aeronave, listMarcas);

    removePrimeirosElementosComIdsRepetidos('divFormAeronaveUpdate');

    fnUpdateAeronaveFormAction(aeronave.id);
};

const fnUpdateAeronaveFormAction = id => {
    const elemento = document.querySelector('#formUpdateAeronave');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnUpdateAeronaveBody(id);
    });
};

const fnUpdateAeronaveBody = id => {
    const marca = document.querySelector('#formControlMarcaUpdate').value;
    const nome = document.querySelector('#formControlNomeUpdate').value;
    const descricao = document.querySelector('#formControlDescricaoUpdate').value;
    const ano = document.querySelector('#formControlAnoUpdate').value;
    const vendido = document.querySelector('#formControlVendidoUpdate').value;
    
    const updateBody = {
        marca: marca,
        nome: nome,
        descricao: descricao,
        ano: ano,
        vendido: vendido
    }

    fnUpdateAeronave(updateBody, id);
};

const fnUpdateAeronave = (updateBody, id) => {
    const url = pathAeronave + '/' + id;
    fetch(url, options.optionsUpdateAeronave(updateBody))
    .then(data => data.json())
    .then(aeronave => {
        [].forEach.call(document.getElementsByClassName("divMensagemErro"), div => div.style.display = 'none');

        if(aeronave.erro){
            gerarMensagensDeErroUpdate(aeronave);
        }else{
            fnIndex();
        }
    })
    .catch(e => console.log(`Ocorreu um erro. fnUpdateAeronave: ${e}`));
}

// DELETE
const fnDeleteAeronave = id => {
    const confirma = confirm(`Deseja realmente excluir o registro #${id}?`);
    if(confirma){
        const url = pathAeronave + '/' + id;
        return fetch(url, options.optionsDeleteAeronave)
        .then(data => data.json())
        .then(aeronave => {
            alert((JSON.stringify(aeronave['message'], null, 4)).replace(/"/g, ''));
            fnIndex();
        })
        .catch(e => console.log(`Ocorreu um erro. fnDeleteAeronave: ${e}`))
    }
};

// PESQUISAR TERMO
const fnPesquisarAeronaveFormAction = () => {
    const elemento = document.querySelector('#formPesquisarAeronaveTermo');
    
    elemento.addEventListener('submit', evento => {
        evento.preventDefault();
        fnPesquisarAeronaveBody();
    });
};

const fnPesquisarAeronaveBody = () => {
    const termo = document.querySelector('#formControlTermo').value;

    fnPesquisarAeronave(termo);
};

const fnPesquisarAeronave = termo => {
    const url = pathAeronave + '/find/' + termo;
    fetch(url, options.optionsGetPadrao)
    .then(data => data.json())
    .then(aeronaves => {
        let divExibirAeronave = document.getElementById("divExibirAeronave");
        
        divExibirAeronave.innerHTML = '';
        divExibirAeronave.style.display = "inline";
        divExibirAeronave.innerHTML = list(aeronaves);
    })
    .catch(e => console.log(`Ocorreu um erro. fnCreateAeronave: ${e}`));
}

const gerarMensagensDeErro = aeronave => {
    let paragraphClass = '';

    paragraphClass = aeronave.erro === true? 'erro-mensagem' : 'sucesso-mensagem';

    if(aeronave.marca){
        let elemento = document.getElementById("erroMarca");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.marca}</p>`;
    }
    if(aeronave.nome){
        let elemento = document.getElementById("erroNome");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.nome}</p>`;
    }
    if(aeronave.descricao){
        let elemento = document.getElementById("erroDescricao");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.descricao}</p>`;
    }
    if(aeronave.ano){
        let elemento = document.getElementById("erroAno");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.ano}</p>`;
    }
    if(aeronave.vendido){
        let elemento = document.getElementById("erroVendido");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.vendido}</p>`;
    }
}

const gerarMensagensDeErroUpdate = aeronave => {
    let paragraphClass = '';

    paragraphClass = aeronave.erro === true? 'erro-mensagem' : 'sucesso-mensagem';

    if(aeronave.marca){
        let elemento = document.getElementById("erroMarcaUpdate");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.marca}</p>`;
    }
    if(aeronave.nome){
        let elemento = document.getElementById("erroNomeUpdate");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.nome}</p>`;
    }
    if(aeronave.descricao){
        let elemento = document.getElementById("erroDescricaoUpdate");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.descricao}</p>`;
    }
    if(aeronave.ano){
        let elemento = document.getElementById("erroAnoUpdate");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.ano}</p>`;
    }
    if(aeronave.vendido){
        let elemento = document.getElementById("erroVendidoUpdate");
        elemento.style.display = 'inline';
        elemento.innerHTML = `<p class=${paragraphClass}>${aeronave.vendido}</p>`;
    }
}

const removeElementosComIdsRepetidos = id => {
    var ids = document.querySelectorAll('#' + id), // Obtém uma collection de elementos com o mesmo id
        len = ids.length,
        n;
    
    if (len < 2) {return;}

    for (n = 1; n < len; n++) {
        if (ids[n]) {
            ids[n].parentElement.removeChild(ids[n]);
        }
    }
}

const removePrimeirosElementosComIdsRepetidos = id => {
    var ids = document.querySelectorAll('#' + id), // Obtém uma collection de elementos com o mesmo id
        len = ids.length,
        n;
    
    if (len < 2) {return;}

    for (n = 0; n < len - 1; n++) {
        if (ids[0]) {
            ids[n].parentElement.removeChild(ids[n]);
        }
    }
}

const fnFecharDivDeExibicao = () => {
    document.getElementById("divExibirAeronave").style.display = "none";
}

// INÍCIO
window.addEventListener("load", () => {
    fnIndex();
});

// Passa funções do escopo do módulo para o escopo global
window.fnReadAeronave = fnReadAeronave;
window.fnUpdateAeronaveRead = fnUpdateAeronaveRead;
window.fnDeleteAeronave = fnDeleteAeronave;
window.fnFecharDivDeExibicao = fnFecharDivDeExibicao;