import { AuthContext } from "../../contexts/User";
import http from "../../services/http"
import { useState, useContext, useEffect } from "react"
import './login.style.css';

export default function Login() {

    const [login, setLogin] = useState({
        email : '',
        senha : ''
    });

    const [loading, setLoading] = useState(false);

    const { setUser, user } = useContext(AuthContext);
    
    const handleChange = (e)=> {
         setLogin((prev)=>(
            {
                ...prev,
                [e.target.name] : e.target.value
            }
         ))
    }

    async function handleSubmit (event){

        event.preventDefault();

        if(!login.email || !login.senha) return;

        try {
              setLoading(true)
              const {data} = await http.post('auth/login',{email: login.email, password : login.senha});

              if(!data.ok) {
               
                console.log(data)
               
              } else {
             
                const userData = {token : data.token, id_usuario : data.id_usuario};
                http.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem('_u', JSON.stringify(userData));

                setUser({token : data.token, id_usuario : data.id_usuario})
                console.log(user)
              }


        } catch (error) {
             console.log(error?.response.data)
        }finally {
              
               setLoading(false)
        }
    }

   async function onLoadPage() {

        const user = JSON.parse(localStorage.getItem('_u')) || null;

        if(user.token) {
            http.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
            setUser(user);
        }else {
            setUser(null)
        }
        
    }

    useEffect(()=> {
        onLoadPage();
    },[])


    return(
        <div className="container">
            
                <h2>Acessar minha conta</h2>
           
            <form>
                <div className="form-group">
                    <div>
                        <label>e-mail</label>
                    </div>
                    <input 
                      onChange={handleChange}
                      type="email"
                      name="email" 
                      placeholder="digite seu e-mail"
                      value={login?.email}
                      />

                </div>

                <div className="form-group">
                    <div>
                        <label>senha</label>
                    </div>
                    <input 
                     onChange={handleChange}
                        type="password" 
                        name="senha"
                        placeholder="digite sua senha"
                        value={login?.senha} 
                        />
                </div>

                <div>
                    <button onClick={handleSubmit}
                     className="btn btn-login"
                     disabled={loading}
                     >
                       {loading ? 'carregando' : 'Acessar'} 
                    </button>
                </div>
            </form>
        </div>
    )
}