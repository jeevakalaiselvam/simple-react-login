import React from "react";
import "./ApplicationData.css";
import AuthContext from "./auth-context";
import { useContext } from "react";

export default function ApplicationData() {
    //Context stored here to help with logging out from Application
    const context = useContext(AuthContext);

    return (
        <div>
            <h1>Application Data</h1>
            <button className="form-button" onClick={context.onLogout}>
                Logout
            </button>
        </div>
    );
}
