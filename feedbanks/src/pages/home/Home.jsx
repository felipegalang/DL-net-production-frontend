import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Topbar from '../../components/topbar/Topbar'
import './home.css'


const Home = ({ count, increment, decrement }) => {

    useEffect(() => {
        console.log("home")
    }, [])
    

    return (
        <>
            <Topbar />

            <div className="home_top" >

            </div>

            <div className="home_container">
                <h1>Redux Counter</h1>
                <div className="card">
                    <button onClick={increment}>Increment</button>
                    <button onClick={decrement}>Decrement</button>
                    <p>Count: {count}</p>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    count: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
