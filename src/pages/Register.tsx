import react, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                email,
                password
              })
            });
          
            if (response.ok) {
              // Respons OK, artinya permintaan berhasil
              const responseData = await response.json();
              console.log('Registrasi berhasil:', responseData);
          
              // Setelah berhasil registrasi, lakukan pengalihan ke halaman login
              navigate('/login');
            } else {
                // Respons tidak OK, tangani kesalahan di sini jika perlu
                const errorData = await response.json();
                setError(errorData.message); // Set state pesan kesalahan
                console.error('Registrasi gagal:', errorData.message);
            }
          } catch (error) {
            // Tangani kesalahan jaringan atau kesalahan lainnya di sini
            setError('Registrasi gagal dilakukan'); // Set state pesan kesalahan
            console.error('Terjadi kesalahan:');
          }
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
            <div className="form-floating">
                <input className="form-control" id="floatingInput" placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e =>setEmail(e.target.value)}/>
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
        </form>
    );
}

export default Register;