export const optionsPadrao = {
    mode: 'cors',
    cache: 'default'
};
export const optionsPadraoComHeaders = {
    ...optionsPadrao,
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
};
export const optionsListAeronaves = {
    ...optionsPadrao,
    method: 'GET'
};
export const optionsCreateAeronave = body => (
    {
        ...optionsPadraoComHeaders,
        method: 'POST',
        body: JSON.stringify({
            ...body
        })
    }
);
export const optionsReadAeronave = {
    ...optionsPadrao,
    method: 'GET'
};
export const optionsUpdateAeronave = body => (
    {
        ...optionsPadraoComHeaders,
        method: 'PUT',
        body: JSON.stringify({
            ...body
        })
    }
);
export const optionsDeleteAeronave = {
    ...optionsPadrao,
    method: 'DELETE'
};
export const optionsGetPadrao = {
    ...optionsPadrao,
    method: 'GET'
};