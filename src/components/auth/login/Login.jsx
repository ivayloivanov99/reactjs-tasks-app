import React, { useState } from 'react';
import "./Login.css";
import { login } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Login(props){

    const [userData, setUserData] = useState({});
    const [isLoggedUser, setLoggedUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onInputChange = (event) => {
        event.persist();

        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value            
        }));
        if(errorMessage){
        setErrorMessage('');
        }
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        login(userData).then(() => {
            console.log("Login successful!");
            setLoggedUser(true);
        })
        .catch((err) =>  setErrorMessage(err.message));     
    };

    return(
       <>
       { isLoggedUser && <Redirect to="/" />}
       <div className="login-wrapper">
            <form className="login-form" onSubmit={onFormSubmit}>
            {errorMessage && <div className="alert alert-danger"><strong>{errorMessage}</strong></div>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange}/>                   
                </div>
                <button className="btn btn-primary">Login</button>
                <Link to="/register">Don't have an account?</Link>
            </form>
        </div>
        </>
    );
}