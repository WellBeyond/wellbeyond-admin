import React from 'react';
import {useMediaQuery} from '@material-ui/core';

import Welcome from './Welcome';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

const Dashboard = () => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                <div style={{ marginBottom: '2em' }}>
                    <Welcome />
                </div>
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
        </div>
    ) : (
        <div style={styles.flex}>
            <div style={styles.leftCol}>
                <div style={styles.singleCol}>
                    <Welcome />
                </div>
            </div>
            <div style={styles.rightCol}>
                <div style={styles.flex}>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
