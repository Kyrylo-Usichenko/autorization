import React from 'react';
import {useDispatch} from "react-redux";
import {login, registration, updateEmailActionCreator, updatePasswordActionCreator} from "../../redux/actions";
import './../../styles/global.css'
import styles from './HomePage.module.css'

const HomePage = ({email, password}) => {
    const dispatch = useDispatch()


    const onEmailChange = (e) => {
        dispatch(updateEmailActionCreator(e.target.value))

    }

    const onPasswordChange = (e) => {
        dispatch(updatePasswordActionCreator(e.target.value))
    }

    const onFormSubmit = (event) => {
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
