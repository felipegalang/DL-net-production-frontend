import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Topbar from '../../components/topbar/Topbar'
import './dashboard.css'
import DashboardUsers from './DashboardUsers'
import DashboardCustomers from './DashboardCustomers'

export const Dashboard = (props) => {

    const [environment, setEnvironment] = useState('users');

    useEffect(() => {
        console.log('props.state', props.state)
        setEnvironment(props.state.login.environment)
    }, [props.state]);


    return (
        <>
            <Topbar />

            <div className="dashboard_container">
                    {environment == 'users' ? (
                        <DashboardUsers />
                    ): (
                        <DashboardCustomers />
                    )}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)