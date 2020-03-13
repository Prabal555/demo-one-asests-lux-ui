import React, { Component } from 'react';

import { ElevateAppBar } from '../../components';
import { Canvas } from './components';
import { cameraConfig } from '../../config';

class Dashboard extends Component {
    render() {
        return (
            <ElevateAppBar appName={'Assets-Lux'}>
                <Canvas 
                    camera={cameraConfig}
                />
            </ElevateAppBar>
        );
    }
}

export default Dashboard;