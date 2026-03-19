 
 
 
 export const formatDate = (data)=> {

     let dataAtual = new Date();
     let dataPedido = new Date(data);

     dataAtual.setHours(0,0,0,0);
     dataPedido.setHours(0,0,0,0);

     let difHours = dataAtual - dataPedido;
     let difMins = Math.round(difHours / (1000 * 60 * 60 * 24))

     switch(difMins) {

        case 0 : return "hoje";
        case  1 : return "ontem";
        default : return dataPedido.toLocaleString('pt-BR').slice(0,10);
     }
     
}