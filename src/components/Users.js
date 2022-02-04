/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../features/users/userSlice';

function Users() {

    const { usersInDataBase } = useSelector(state => state.users);
    const { user } = useSelector(state => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/');
    }

    return (
        <div style={{ color: 'red', fontSize: '1rem' }}>
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
        </div>
    );
}

export default Users;
