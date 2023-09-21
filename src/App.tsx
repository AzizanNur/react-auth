import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:8000/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });

          if (response.ok) {
            const content = await response.json();
            console.log(content);
            setName(content.name);
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Atur loading ke false setelah selesai fetching
        }
      }
    )();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <Nav name={name} setName={setName}/>
      <main className="form-signin w-100 m-auto">
      { loading ? 
        (<h1>Loading ...</h1>) : (
          <Routes>
            <Route path='/' element={<Home name={name}/>} />
            <Route path='/login' element={<Login setName={setName}/>} />
            <Route path='/register' element={<Register />} />
          </Routes>
      )}
    </main>
    </BrowserRouter>
    </div>
  );
}

export default App;
