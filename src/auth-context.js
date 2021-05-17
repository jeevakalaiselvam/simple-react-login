import React from "react";

//Main authentication context data stored here.
const AuthContext = React.createContext({
    isLoggedIn: false,
});

export default AuthContext;
