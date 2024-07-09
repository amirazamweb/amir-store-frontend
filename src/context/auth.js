import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: undefined });

    // get Auth from local store

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('amir_store_auth'));
        if (data) {
            setAuth({ ...auth, user: data?.user, token: data?.token });
        }
    }, [auth?.token])

    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };