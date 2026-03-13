import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export const DashboardUsers = (props) => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // LIBRARIES
    const product_types = {
        credit_card: "Tarjeta de crédito",
        mortgage: "Crédito ipotecario"
    }


    // STATES
    const [loginData, setLoginData] = useState();
    const [products, setProducts] = useState();


    // EFFECTS
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("login"));
        console.log("data", data);
        if (data) {
            setLoginData(data);
        }
    }, []);

    useEffect(() => {
        console.log("props", props)
    }, [props]);



    useEffect(() => {
        console.log('products', products)
    }, [products]);




    // FUNCTIONS
    const fetchGetProducts = async () => {
        console.log('fetchLogin')
        try {
            const response = await fetch(`${BACKEND_URL}/products`, {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify(loginObject)
            });

            console.log("response", response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('data:', data);

            setProducts(data);

        } catch (error) {
            console.error('Fetch error:', error);
        }

    }



    return (
        <>
            <div className="navbar">
                DASHBOARD NAVBAR
                <div className="buttons_container">
                    <div className="button">
                        ver cuentas
                    </div>

                    <div className="button"
                        onClick={() => fetchGetProducts()}
                    >
                        ver productos
                    </div>
                </div>
            </div>

            <div className="content">
                DASHBOARD CONTENT
                <div className="products_container">
                    {products && (
                        products.map((product, i) => (
                            console.log({ product }),
                            <div className="product_card" key={i}>
                                <h3>{product.name}</h3>
                                <h5>{product_types[product.type]}</h5>
                                <p>Tasa de interés: {(product.interest_rate * 100).toFixed(1)}%</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUsers)