import react from 'react';

const Register = () => {
    return (
        <form>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
            <div className="form-floating">
                <input className="form-control" id="floatingInput" placeholder="Name" />
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
        </form>
    );
}

export default Register;