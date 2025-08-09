import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useMoneyStore from '../store/money-store';

const ProtectedRoute = ({ children }) => {
    
    const { user } = useMoneyStore();
    const location = useLocation();

  
    if (!user) {
        
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return children;
};

export default ProtectedRoute;