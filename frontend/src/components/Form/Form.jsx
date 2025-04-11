import { useState } from "react";
import api from "../../api.js";
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants.js";

export default function Form({ route, method }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loadig, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login'? 'Login': 'Register';   
  
    const submitHandle = async (event) =>{
        setLoading(true); 
        event.preventDefault();
        
        try{
            const res = await api.post(route, { username, password}); 
            if(method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            }else{
                navigate('/login'); 
            }

        }catch(error){
            alert(error);
        }
        finally{
            setLoading(false);
        }
    }  
    
    const toggle = () => {
        if(method === 'login')
            navigate('/register');
        else
            navigate('/login');           
    }

    return (
        <form method="post" className="has-background-warning" onSubmit={submitHandle}>

            <div className="field">
                <h1 className="is-size-1">{name}</h1>
            </div>

            <div className="field">
                <label className="label is-small">Username</label>
                <input type="text" className="input is-small" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>

            <div className="field">
                <label className="label is-small">Password</label>
                <input type="password" className="input is-small" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="buttons">
                <button className="button is-black is-small" type="submit">{name}</button>
                <button className="button is-white is-small" type="button" onClick={()=>toggle()}>{method === 'login'?'Register':'Login'}</button>
            </div>

        </form>
    );
}

