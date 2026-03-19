

export const styles = {
    overlay : {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido transparente
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
    },
    modalContent : {
    width: '100%',             // Ocupa 80% da largura
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius : 20,
    padding: 20,
    alignItems: 'center',
    // Adicione o boxShadow que aprendemos!
    boxShadow: '0px 2px 10px rgba(0,0,0,0.25)',
    elevation: 8,
    }
}