import classes from "./LoginForm.module.css";
import React from "react";
import { useState, useEffect } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [formValid, setFormValid] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const emailChangedHandler = (event) => {
        const emailInput = event.target.value;
        setEmail(emailInput);
    };
    const passwordChangedHandler = (event) => {
        const passwordInput = event.target.value;
        setPassword(passwordInput);
    };

    const showValidationError = () => {
        setError("Enter valid email and password !");
    };

    const onFormSubmitHandler = (event) => {
        event.preventDefault();
        if (formValid) {
            localStorage.setItem("loginInfo", "1");
            setLoggedIn(true);
        } else {
            showValidationError();
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormValid(
                email.includes("@") &&
                    email.includes(".") &&
                    password.trim().length > 6
            );
        }, 500);

        return () => {
            clearTimeout();
        };
    }, [email, password]);

    return (
        <div>
            <form
                onSubmit={onFormSubmitHandler}
                className={loggedIn ? classes["hidden"] : classes["form-main"]}
            >
                <p className={classes["error"]}>{error}</p>
                <div className={classes["form-item"]}>
                    <input
                        className={classes["form-input"]}
                        id="email"
                        type="text"
                        placeholder="Enter your email..."
                        autoComplete="off"
                        onChange={emailChangedHandler}
                    />
                </div>
                <div className={classes["form-item"]}>
                    <input
                        autoComplete="off"
                        className={classes["form-input"]}
                        id="password"
                        type="text"
                        placeholder="Enter your password..."
                        onChange={passwordChangedHandler}
                    />
                </div>
                <div className={classes["form-item"]}>
                    <button className={classes["form-button"]} type="submit">
                        Login
                    </button>
                </div>
            </form>
            <br />
            <div
                className={loggedIn ? classes["app-login"] : classes["hidden"]}
            >
                Application Logged In.
            </div>
        </div>
    );
};

export default LoginForm;
