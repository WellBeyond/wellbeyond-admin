import React, {CSSProperties, useCallback, useEffect, useState,} from 'react';
import {useDataProvider, useVersion} from 'react-admin';
import {Theme, useMediaQuery} from '@material-ui/core';
import {Organization, TrainingSession, User} from '../types'

import Welcome from './Welcome';
import UsersByCommunity from './UsersByCommunity';


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
    const [sessions, setSessions] = useState<TrainingSession[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );

    const fetchSessions = useCallback(async () => {
        dataProvider.getList('sessions', {
            filter: { },
            sort: { field: 'started', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setSessions(data);
        });
    }, [dataProvider]);

    const fetchUsers = useCallback(async () => {
        dataProvider.getList('users', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setUsers(data);
        });
    }, [dataProvider]);

    const fetchOrganizations = useCallback(async () => {
        dataProvider.getList('organizations', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setOrganizations(data);
        });
    }, [dataProvider]);


    useEffect(() => {
        fetchSessions();
        fetchUsers();
        fetchOrganizations();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    return isXSmall ? (
        <div>
            <div style={styles.flexColumn as CSSProperties}>
                <div style={{ marginBottom: '2em' }}>
                    <Welcome />
                </div>
            </div>
            <div style={styles.flexColumn as CSSProperties}>
                <div style={{ marginBottom: '2em' }}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn as CSSProperties}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
            <div style={styles.flexColumn as CSSProperties}>
                <div style={styles.singleCol}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
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
                <div style={styles.singleCol}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
