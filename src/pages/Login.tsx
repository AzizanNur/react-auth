import react, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props: {setName: (name: string) => void}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                const content = await response.json();
                props.setName(content.name);
                setRedirect(true);
            }else{
                setError('Login failed, plese try again');
            }
        } catch (error) {
            // Tangani kesalahan jaringan atau kesalahan lainnya di sini
            setError('Login failed, plese try again');
          }
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
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    );
}

export default Login;