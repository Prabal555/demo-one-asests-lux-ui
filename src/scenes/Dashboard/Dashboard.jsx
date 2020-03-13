import React, { Component } from 'react';

import { ElevateAppBar } from '../../components';
import { Canvas } from './components';

class Dashboard extends Component {
    render() {
        return <ElevateAppBar appName={'Assets-Lux'}><Canvas/></ElevateAppBar>;
    }
}

export default Dashboard;