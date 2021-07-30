import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {login, registration} from "../../redux/actions";
import './../../styles/global.css'
import styles from './HomePage.module.css'

const HomePage: React.FunctionComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()


    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const onRegisterClick = () => {
        dispatch(registration(email, password))
    }

    const onLoginClick = () => {
        dispatch(login(email, password))
    }


    return (
        <div className='container'>
            <form onSubmit={onFormSubmit} className={styles.form}>
                <input className={styles.input} type="email" placeholder='Email' onChange={onEmailChange} value={email} required/>
                <input className={styles.input} type="password" placeholder='Password' onChange={onPasswordChange} value={password}
                       autoComplete="on" required/>
                <div className={styles.buttons}>
                    <button className={styles.button} type='submit' onClick={onLoginClick}>login</button>
                    <button className={styles.button} type='submit' onClick={onRegisterClick}>sign up</button>
                </div>
            </form>
        </div>
    );
};

export default HomePage;
