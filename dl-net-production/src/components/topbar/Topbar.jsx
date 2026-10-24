import { NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './topbar.css';
import { useEffect, useState } from 'react';

export const Topbar = () => {

    const navigate = useNavigate();


    const [loginData, setLoginData] = useState();


    // USE EFFECT
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("login"));
        console.log("data", data)

        if (data) {
            setLoginData(data);
        }
    }, []);


    const signout = () => {
        localStorage.removeItem("login");
        navigate("/", { replace: true });
    }

    return (
        <div className="topbar_container">
            <div className="left">
                <NavLink to="/" className="nav-item">
                    HOME
                </NavLink>
                <NavLink to="/about" className="nav-item">
                    ABOUT US
                </NavLink>
                <NavLink to="/about" className="nav-item">
                    PRODUCTS
                </NavLink>
            </div>

            <div className="center">
                <NavLink to="/" className="nav-item">
                    FeedBanks
                </NavLink>
            </div>

            <div className="right">
                {loginData ? (
                    <>
                        <NavLink to="/dashboard" className="nav-item" >
                            DASHBOARD
                        </NavLink>
                        <div className="nav-item" onClick={() => signout()} >
                            SALIR
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="nav-item" >
                            LOGIN
                        </NavLink>
                        <NavLink to="/register" className="nav-item">
                            REGISTER
                        </NavLink>
                    </>
                )}

            </div>
        </div>
    );
};

export default connect(null, null)(Topbar);
