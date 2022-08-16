import React from 'react';
import {Route} from 'react-router-dom';
import Configuration from './configuration/Configuration';
import SystemOverviewComponent from './systemOverview/SystemOverview';

export default [
    <Route exact path="/configuration" render={() => <Configuration />} />,
    <Route exact path="/systemOverview" render={() => <SystemOverviewComponent />} />,
];
