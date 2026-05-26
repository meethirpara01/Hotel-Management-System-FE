import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CustomerRoute = ({ children }) => {

    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "CUSTOMER") {
        return <Navigate to="/" />;
    }
    return children;
}

export default CustomerRoute