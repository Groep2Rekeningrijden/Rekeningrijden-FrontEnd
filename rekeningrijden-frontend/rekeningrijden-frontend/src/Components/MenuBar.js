import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';

export default class App extends Component {
    static displayName = App.name;
    state = {
    }

    render() {
        return (
            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/AddCar">Add Car</Link>
                        </li>
                    </ul>
                </nav>

                <Outlet />
            </>
        )
    }
}
