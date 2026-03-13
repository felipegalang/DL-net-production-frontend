import React, { use, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Topbar from '../../components/topbar/Topbar'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import './register.css'

export const Register = (props) => {

    // Redux
    const { login } = props

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();


    const [environment, setEnvironment] = useState('customers'); // 'customers' or 'users'
    const [registerObject, setRegisterObject] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    // USE EFFECT
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("login"));

        console.log("data", data)
        if (data) {
            login(data);
            navigate("/dashboard", { replace: true });
        }
    }, []);


    // FUNCTIONS

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchRegister();
    };

    const fetchRegister = async () => {
        console.log('fetchRegister')
        if (registerObject.password == registerObject.confirmPassword) {
            let registerInfo = {
                name: registerObject.name,
                email: registerObject.email,
                password: registerObject.password,
            }
            console.log("registerInfo", registerInfo)
            try {
                const response = await fetch(`${BACKEND_URL}/${environment}/register`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registerInfo)
                });

                console.log("response", response);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Response:', data);

                // // const dispatch = useDispatch();

                // login(data);
                // localStorage.setItem("login", JSON.stringify(data));

            } catch (error) {
                console.log("no entra")
                console.error('Fetch error:', error);
            }

        } else {
            setError("Passwords do not match");
        }
    };


    const formHandler = (e, field) => {
        setError('');
        setRegisterObject({ ...registerObject, [field]: e.target.value });
    }

    return (
        <>
            <Topbar />

            <div className="register_container">

                <div className="register_wrapper">
                    <div className="left_panel" style={{ background: environment == 'users' && 'rgb(30 60 80)' }}>
                        <div className="left_container"
                            style={{ background: environment == 'users' && 'rgb(40 80 110)' }}
                        >
                            <div className="brand">
                                <div className="logo" />
                                <span><h1>FeedBanks</h1> </span>
                            </div>

                            <p className="description">
                                Crea tu cuenta y accede a una
                                <br />
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

                            <h1>Register</h1>
                            <p className="subtitle">
                                Acceso inteligente a tu información bancaria.
                            </p>

                            <form className="register_form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={registerObject.name}
                                    onChange={(e) =>
                                        formHandler(e, 'name')
                                    }
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={registerObject.email}
                                    onChange={(e) =>
                                        formHandler(e, 'email')
                                    }
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={registerObject.password}
                                    onChange={(e) =>
                                        formHandler(e, 'password')
                                    }
                                />

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={registerObject.confirmPassword}
                                    onChange={(e) =>
                                        formHandler(e, 'confirmPassword')
                                    }
                                />

                                {error && <p className="error_message" style={{ color: 'red' }}>{error}</p>}

                                <div className="options">
                                    <NavLink to="/login">Ya tengo cuenta</NavLink>
                                </div>

                                <button type="submit" className="register_btn">
                                    Registrarme
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
export default connect(mapStateToProps, mapDispatchToProps)(Register)