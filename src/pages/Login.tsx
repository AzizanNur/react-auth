import react, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props: {setName: (name: string) => void}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();
        setRedirect(true);
        props.setName(content.name);
    }

    if(redirect){
        navigate('/');
    }

    return(
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    );
}

export default Login;