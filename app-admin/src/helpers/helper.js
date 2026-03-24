
export const dataConverter = (data) => {

    let dataAtual = new Date();
    let dataPedido = new Date(data);

    let difEmSegundos  = dataAtual - dataPedido;
    let diffMins = Math.floor(difEmSegundos / (1000 * 60))
    let diffEmHoras = Math.floor(diffMins / 60)

    if(diffMins < 1) {
        return "agora mesmo";
    }

    if(diffMins < 60) {
        return `há ${diffMins} min`;
    }
    if(diffEmHoras < 24) {
        return `há ${diffEmHoras} ${diffEmHoras === 1 ? 'hora' : 'horas'} atrás`;
    }

    return dataPedido.toLocaleDateString('pt-BR').slice(0,10)
}