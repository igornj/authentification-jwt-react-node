/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../features/users/userSlice';
import axios from 'axios';

function Users() {

    const { usersInDataBase, user } = useSelector(state => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await axios.get('http://localhost:3001/users')
                .then((response) => {
                    toast.success('Login efetuado com sucesso');
                })
                .catch(error => {
                    navigate('/');
                });
        })();
    }, []);


    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/');
    }

    return (
        <div style={{ color: 'red' }}>
            <h1>Registered Users</h1>
            {usersInDataBase.map(user => {
                return (
                    <p style={{ color: 'black', fontSize: '1rem' }} key={user.password}>{user.username}</p>
                )
            })}

            <h1>User Logged in</h1>
            <p style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }}>{user.username}</p>
            <br />
            <button type='button' onClick={handleLogout}>Logout</button>
            {/* <button type="button" onClick={isUserAuthenticated}>auth</button> */}
        </div>
    );
}

export default Users;
