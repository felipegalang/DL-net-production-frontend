import React, { use, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Topbar from '../../components/topbar/Topbar'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import './login.css'

export const Login = (props) => {

    // Redux
    const { login } = props

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();


    const [environment, setEnvironment] = useState('customers'); // 'customers' or 'users'
    const [loginObject, setLoginObject] = useState({ email: '', password: '' });


    // USE EFFECT
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("login"));

        console.log("data", data)
        if (data) {
            login(data);
            navigate("/dashboard", { replace: true });
        }
    }, []);

    useEffect(() => {
        console.log("cambio de la variable environment", environment)
    }, [environment]);


    // FUNCTIONS

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchLogin();
    };

    const fetchLogin = async () => {
        console.log('fetchLogin')
        // try {
        const response = await fetch(`${BACKEND_URL}/${environment}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginObject)
        });

        console.log("response", response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        data.environment = environment;
        console.log('Response:', data);

        login(data);
        localStorage.setItem("login", JSON.stringify(data));
        navigate("/dashboard", { replace: true });

        // } catch (error) {
        //     console.error('Fetch error:', error);
        // }
    };




    return (
        <>
            <Topbar />

            <div className="login_container">

                <div className="login_wrapper">
                    <div className="left_panel" style={{ background: environment == 'users' && 'rgb(30 60 80)' }}>
                        <div className="left_container"
                            style={{ background: environment == 'users' && 'rgb(40 80 110)' }}
                        >
                            <div className="brand">
                                <div className="logo" />
                                <span><h1>FeedBanks</h1> </span>
                            </div>

                            <p className="description">
                                Gestión bancaria segura y eficiente.
                            </p>

                            {/* <button className="cta">Get Started</button> */}
                            <span className="copyright">© 2025 Company</span>
                        </div>
                    </div>


                    <div className="right_panel">
                        <div className="right_container">
                            <div className="tabs">
                                <button className="right_tab" style={{ background: environment == 'customers' && '#e5e5e5' }}
                                    onClick={() => setEnvironment('customers')}
                                >Clientes</button>
                                <button className="left_tab" style={{ background: environment == 'users' && '#e5e5e5' }}
                                    onClick={() => setEnvironment('users')}
                                >Gestores</button>
                            </div>

                            <h1>Login</h1>
                            <p className="subtitle">
                                Acceso inteligente a tu información bancaria.
                            </p>

                            <form className="login_form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={loginObject.email}
                                    onChange={(e) =>
                                        setLoginObject({ ...loginObject, email: e.target.value })
                                    }
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginObject.password}
                                    onChange={(e) =>
                                        setLoginObject({ ...loginObject, password: e.target.value })
                                    }
                                />

                                <div className="options">
                                    <NavLink to="/register">Olvidé mi contraseña</NavLink>
                                </div>

                                <button type="submit" className="login_btn">
                                    Login
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (value) => {
            dispatch({ type: 'LOGIN', payload: value })
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)