import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/users/userSlice';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async () => {

        if (username === '' || password === '') {
            toast.error("Os campos não podem estar vazios");
            return;
        }

        await axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }, { withCredentials: true })
            .then((response) => {
                dispatch(userLoggedIn({ username: username, password: password }));
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`;
                navigate('/users');
            })
            .catch(error => {
                toast.error('Ocorreu um erro ao tentar fazer login');
            });
    }


    // //grab the jwt saved in the localstorage and send to headers
    // const isUserAuthenticated = () => {
    //     axios.get('http://localhost:3001/users', {
    //         headers: {
    //             'x-access-token': localStorage.getItem('token'),
    //         },
    //     }).then((response) => {
    //         console.log(response);
    //     });
    // };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', rowGap: "0.8rem", marginTop: "4rem" }}>
            <h1>LOGIN</h1>
            <label>Username:</label>
            <input type="text" placeholder="user" onChange={(e) => setUsername(e.target.value)} />

            <label>Senha:</label>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={handleLogin} >Login</button >
            <Link style={{ textDecoration: 'none', }} to="/register">Não tem conta? registre-se</Link>
        </div>
    );
}

export default Login;
