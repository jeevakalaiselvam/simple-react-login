import classes from "./LoginForm.module.css";
import React from "react";
import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const emailChangedHandler = (event) => {
        const emailInput = event.target.value;
        checkEmailValidation();
    };
    const passwordChangedHandler = (event) => {
        const passwordInput = event.target.value;
        checkPasswordValidation(passwordInput);
    };

    const checkEmailValidation = (email) => {
        if (!email.includes("@")) {
            setError("Not a valid email!");
        }
    };

    const checkPasswordValidation = (password) => {
        if (password.length <= 5) {
            setError("Not a valid password!");
        }
    };
    const onFormSubmitHandler = (event) => {
        event.preventDefaults();
    };

    return (
        <div>
            <form onSubmit={onFormSubmitHandler}>
                <p>{error}</p>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" onChange={emailChangedHandler} />
                <label htmlFor="password">Username</label>
                <input
                    id="password"
                    type="text"
                    onChange={passwordChangedHandler}
                />
            </form>
        </div>
    );
};

export default LoginForm;
