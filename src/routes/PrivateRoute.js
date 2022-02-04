/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import propTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {

    const { token } = useSelector(state => state.users);
    return (
        <Route
            {...rest}
            render={(props) => {
                return token ? (
                    <Component {...props} />
                ) : (
                    <Navigate to={{ pathname: '/login' }} />
                );
            }}
        />
    );
}

PrivateRoute.defaultProps = {
    component: ''
};

PrivateRoute.propTypes = {
    component: propTypes.any,
};

export default PrivateRoute;
