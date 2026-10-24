import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Chart from '../../components/chart/Chart';

export const DashboardCustomers = (props) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // LIBRARIES
    const product_types = {
        credit_card: "Tarjeta de crédito",
        mortgage: "Crédito ipotecario"
    }


    // STATES
    const [loginData, setLoginData] = useState();
    const [products, setProducts] = useState();
    const [usdHistory, setUsdHistory] = useState([]);

    const [lastDifference, setLastDifference] = useState();
    const [previousEvents, setPreviousEvents] = useState();
    const [day, setDay] = useState();
    const [nextDay, setNextDay] = useState();


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


    useEffect(() => {
        console.log("loginData", loginData)
    }, [loginData]);


    useEffect(() => {
        console.log("previousEvents", previousEvents)
    }, [previousEvents]);




    // FUNCTIONS
    const fetchGetAccounts = async () => {
        console.log('fetchLogin')
        try {
            const response = await fetch(`${BACKEND_URL}/customers/accounts/${loginData.id}`, {
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


    const fetchUsdHistory = async () => {
        console.log("Fetching USD/COP history...");

        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setFullYear(endDate.getFullYear() - 1);

            const formatDate = (date) => date.toISOString().split("T")[0];

            const response = await fetch(`${BACKEND_URL}/users/usd-history?from=USD&to=EUR`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const prices = await response.json();

            setUsdHistory(prices);

            console.log('prices', prices)

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };


    // Calculating the odds for a new value
    // Getting the how many times did that difference presented previously
    const getDifferences = (data) => {
        let day_index = 200
        let tolerance = 0.02;
        let last_difference = data[day_index - 1].percentageChange

        let day_behave = getTrend(data, day_index)
        console.log('day_behave', day_behave)

        let previous_events = {
            data: [],
            going_up: [],
            going_down: [],
        }

        let behave;
        if (data[day_index - 1]) {
            data.forEach((time, i) => {

                if (last_difference - tolerance < time.percentageChange && time.percentageChange <= last_difference + tolerance) {
                    // getting the behave for data that coincide
                    behave = getTrend(data, i);
                    time.behave = behave;
                    console.log(`behave ${i} `, behave)
                    if (data[i + 1]) {
                        time.movement = data[i + 1].percentageChange;

                        previous_events.data.push(time);
                        if (data[i + 1].percentageChange > 0)
                            previous_events.going_up.push(time)

                        if (data[i + 1].percentageChange <= 0)
                            previous_events.going_down.push(time)
                    }
                    if (i == day_index - 1) {
                        setDay(time);
                        if (data[i + 2]) {
                            data[i + 1].movement = data[i + 2].percentageChange
                            setNextDay(data[i + 1])
                        }
                    }
                }

            });

            setLastDifference(last_difference)
            setPreviousEvents(previous_events)
        } else {
            console.warn('No Data that day');

        }
    }


    const getTrend = (data, index, amount = 3) => {
        // console.log("data[index - 1]", data[index - 1])
        // Getting the trend of the point
        let trend = {
            percentages: [],
            behave: [],
            average: 0
        };
        let sum = 0;
        for (let i = 1; i <= amount; i++) {
            if (data[index - 1 - i]) {
                trend.percentages.push(data[index - 1 - i].percentageChange)
                sum = sum + data[index - 1 - i].percentageChange;
                if (data[index - 1 - i].percentageChange > 0) {
                    trend.behave.push(1)
                } else {
                    trend.behave.push(-1)
                }
            }

            // calculating average
            if (i == amount) {
                trend.average = Math.round(sum * 1000) / 1000
            }
        }

        return trend

    }



    // const getDifferences = (data) => {
    //     let day_index = 300
    //     let tolerance = 0.01;
    //     let last_difference = data[day_index - 1].percentageChange

    //     let previous_events = {
    //         data: [],
    //         going_up: [],
    //         going_down: [],
    //     }

    //     if (data[day_index - 1]) {
    //         data.forEach((time, i) => {

    //             if (last_difference - tolerance < time.percentageChange && time.percentageChange <= last_difference + tolerance) {
    //                 if (data[i + 1]) {
    //                     time.movement = data[i + 1].percentageChange;

    //                     previous_events.data.push(time);
    //                     if (data[i + 1].percentageChange > 0)
    //                         previous_events.going_up.push(time)

    //                     if (data[i + 1].percentageChange <= 0)
    //                         previous_events.going_down.push(time)
    //                 }
    //                 if (i == day_index - 1) {
    //                     setDay(time);
    //                     if (data[i + 2]) {
    //                         data[i + 1].movement = data[i + 2].percentageChange
    //                         setNextDay(data[i + 1])
    //                     }
    //                 }
    //             }

    //         });

    //         setLastDifference(last_difference)
    //         setPreviousEvents(previous_events)
    //     } else {
    //         console.warn('No Data that day');

    //     }
    // }




    return (
        loginData && <>
            <div className="navbar">
                CLIENTE: {loginData.email}
                <div className="buttons_container">
                    <div className="button"
                        onClick={() => fetchGetAccounts()}
                    >
                        ver cuentas
                    </div>

                    <div className="button"
                    >
                        ver productos
                    </div>

                    <div className="button"
                        onClick={() => fetchUsdHistory()}
                    >
                        Ver Dolar
                    </div>

                    <div className="button"
                        onClick={() => getDifferences(usdHistory)}
                    >
                        Ver Diferencias
                    </div>
                </div>
            </div>

            <div className="content">
                DASHBOARD CONTENT

                {/* {usdHistory.length > 0 && (<>
                    <div className="usd_history">
                        <h4>Historial USD/COP</h4>
                        <ul>
                            {usdHistory.slice(-5).map((entry) => (
                                <li key={entry.date}>
                                    {entry.date}: COP {entry.price.toLocaleString("es-CO")}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>)} */}

                {previousEvents && <div className="usd_history">
                    <h4>day: {day.date}: COP {day.price.toLocaleString("es-CO")}: {day.movement},      {day.behave.average}</h4>
                    <h4>Next day: {nextDay.date}: COP {nextDay.price.toLocaleString("es-CO")}: {nextDay.movement} </h4>

                    <h4>Previous events</h4>
                    <ul>
                        {previousEvents.data.map((value, i) => (
                            <li key={value.date}>
                                {i} -- {value.date}: COP {value.price.toLocaleString("es-CO")}: {value.movement}, {value.behave.average}
                            </li>
                        ))}
                    </ul>

                    <h4>Going up</h4>
                    <ul>
                        {previousEvents.going_up.map((value, i) => (
                            <li key={value.date}>
                                {i} -- {value.date}: COP {value.price.toLocaleString("es-CO")}: {value.movement}, {value.behave.average}
                            </li>
                        ))}
                    </ul>

                    <h4>Going down</h4>
                    <ul>
                        {previousEvents.going_down.map((value, i) => (
                            <li key={value.date}>
                                {i} -- {value.date}: COP {value.price.toLocaleString("es-CO")}: {value.movement}, {value.behave.average}
                            </li>
                        ))}
                    </ul>

                </div>}

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

                {usdHistory && <Chart data={usdHistory} attribute={"price"} />}
                {/* {usdHistory && <Chart data={usdHistory} attribute={"difference"} />} */}
                {usdHistory && <Chart data={usdHistory} attribute={"percentageChange"} />}
            </div>
        </>

    )
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCustomers)