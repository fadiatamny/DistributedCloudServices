import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Header extends Component {
    active  = {
        backgroundColor: '#212F3D',
        color: 'white',
        fontWeight: 'bold'
    }
    header = {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-evenly'
    }
    render() {
        return (
            <div style={this.style}>
                <NavLink exact to="/" activeStyle={this.active}>
                Home
                </NavLink>
                <NavLink exact to="/MyIdeas" activeStyle={this.active}>
                MyIdeas
                </NavLink>
            </div>
        )
    }
}

export default Header