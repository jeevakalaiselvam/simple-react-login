import React from "react";
import { useState, useEffect } from "react";

//Main authentication context data stored here.
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: {},
    onLogin: {},
});

/**
 * @author Jeeva Kalaiselvam
 * @param {*} props
 * @returns
 */
export const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    //Handler to handler user logout. It changes login state and sets a local storage item to maintain session
    const logoutHandler = () => {
        localStorage.setItem("loginInfo", "0");
        setLoggedIn(false);
    };

    //Handler to handler user login. It changes login state and sets a local storage item to maintain session
    const loginHandler = () => {
        localStorage.setItem("loginInfo", "1");
        setLoggedIn(true);
    };

    //Run only once. Used to check if session is already present in local storage and maintain login state accordingly
    useEffect(() => {
        const storedUserInfo = localStorage.getItem("loginInfo");
        if (storedUserInfo === 1) {
            setLoggedIn(true);
        }
        return () => {};
    }, []);

    //JSX Context Provider that is maintained across all components when imported
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: loggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
