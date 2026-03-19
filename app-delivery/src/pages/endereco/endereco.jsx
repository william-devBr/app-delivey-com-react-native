

import FormEndereco from "../../components/FormEndereco/FormEndereco"

/**
 *  Página de login, onde o usuário pode inserir suas credenciais para acessar a aplicação.
 * @returns 
 */
export default function Endereco(props) {
 
    const { user } = props.route.params;
 
    return (
       <FormEndereco user={user} page="signup" title="Cadastrar endereço" buttonTitle="Criar minha conta" />
    )
}