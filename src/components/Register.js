import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registeredUsers } from '../features/users/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = () => {
        axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
        })
            .then((response) => {
                toast.success("Usuário criado com sucesso");
                dispatch(registeredUsers({ username: usernameReg, password: passwordReg }));
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', rowGap: "0.8rem", marginTop: "5rem" }}>
            <h1>Register</h1>
            <label>Username:</label>
            <input type="text" placeholder="user" onChange={(e) => setUsernameReg(e.target.value)} />

            <label>Senha:</label>
            <input type="password" placeholder="password" onChange={(e) => setPasswordReg(e.target.value)} />
            <button onClick={handleRegister} type="submit">Register</button>
        </div>
    );
}

export default Register;
