import React, { useState, useEffect, useContext} from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const[isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get("isLoggedIn");
        setLoggedIn(token);
    },[])

    return (
        <AuthContext.Provider value={{isLoggedIn, setisLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const {isLoggedIn, setLoggedIn} = useContext(AuthContext);

    return {
        isLoggedIn,setisLoggedIn
    }
}

export { AuthProvider, useAuth };