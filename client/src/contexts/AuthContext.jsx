import API from "../lib/API";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState({ uid: '', username: ''});
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userInfo = await API.info(token);
                setUser(userInfo);
                setIsLoggedIn(true);
            } catch (err) {
                setIsLoggedIn(false);
                setUser({ uid: '', username: ''});
            }
        }
        checkAuth();
    }, []);

    const login = async (username, password) => {
        const response = await API.login(username, password);
        setIsLoggedIn(true);
        setToken(response.token);
        localStorage.setItem('token', response.token);
    }

    const logout = () => {
        setToken('');
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setUser({ uid: '', username: '' });
    };

    const value = {
        login, logout,
        token, setToken,
        isLoggedIn, setIsLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export { AuthProvider, AuthContext };