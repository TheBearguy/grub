import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom';

function AuthLayout({children}) {
    const { isSignedIn, isLoaded, user } = useUser();
    // const { pathname } = useLocation();

    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/?sign-in=true" />;
    }
}

export default AuthLayout;
