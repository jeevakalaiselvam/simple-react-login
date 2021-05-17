import classes from "./LoginForm.module.css";
import React from "react";
import { useState, useEffect, useReducer, useContext } from "react";
import ApplicationData from "./ApplicationData";
import AuthContext, { AuthContextProvider } from "./AuthContextProvider";

/**
 * @author Jeeva Kalaiselvam
 * @returns HTML containing the login form component and logged in application component
 */
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [formValid, setFormValid] = useState("");

    //Auth Context used to managed login and logout state that is shared to all components
    const authContext = useContext(AuthContext);

    //For any changes in email input by user, Change email state for component re-render
    const emailChangedHandler = (event) => {
        const emailInput = event.target.value;
        setEmail(emailInput);
    };

    //For any changes in password input by user, Change password state for component re-render
    const passwordChangedHandler = (event) => {
        const passwordInput = event.target.value;
        setPassword(passwordInput);
    };

    //Show a error message in the error component section when its state value is set
    const showValidationError = () => {
        setError("Enter valid email and password !");
    };

    //When form is submitted, Prevent default behaviour. Check if formValid state is true, If yes, Confirm that the user is logged in. If not, There is some error, So show the error message by calling the showValidationError function
    const onFormSubmitHandler = (event) => {
        event.preventDefault();
        if (formValid) {
            authContext.onLogin();
        } else {
            showValidationError();
        }
    };

    //This hook runs everytime there is a change to email input or passwor input. They are set as dependencies. Anytime they change, Wait for 500ms and check form validation. On continous input, When state changes and re-render might occur, Clear the old timeout.
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

    //JSX containing the wrapped containers for form and application login info
    return (
        <div>
            <form
                onSubmit={onFormSubmitHandler}
                className={
                    authContext.isLoggedIn
                        ? classes["hidden"]
                        : classes["form-main"]
                }
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

            {/* Sample Application Logged in section. This can be later implemented using routes */}
            <div
                className={
                    authContext.isLoggedIn
                        ? classes["app-login"]
                        : classes["hidden"]
                }
            >
                <ApplicationData />
            </div>
        </div>
    );
};

export default LoginForm;
