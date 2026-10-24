import React from 'react'
import { connect } from 'react-redux'
import Topbar from '../../components/topbar/Topbar'

export const About = (props) => {
    return (
        <>
            <Topbar />
            <div>About </div>
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(About)