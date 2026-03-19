

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const regexCep = (cep) => {

    let value = cep.replace(/\D/g, '');

    if(value.length > 8) value = value.slice(0, 8);

    value = value.replace(/(\d{5})(\d{3})/,'$1-$2')
    return value;
}

const validaNumero = (numero)=> {

    if(numero.length > 10) numero = numero.slice(0,10);
    return numero.replace(/\D/g,'')
}

const telephoneFormated = (telefone)=> {

     let value = telefone.replace(/\D/g,'');

     value = value.replace(/(\d{2})(\d{5})(\d{4})/,'($1)$2-$3')
     return value;
}



export { validateEmail, regexCep, validaNumero, telephoneFormated};