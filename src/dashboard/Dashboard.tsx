import React, {CSSProperties, useCallback, useEffect, useState,} from 'react';
import {useDataProvider, useTranslate, useVersion} from 'react-admin';
import {Theme, useMediaQuery, Card, CardHeader, CardContent} from '@material-ui/core';
import {Organization, Subject, TrainingSession, User} from '../types'

import Welcome from './Welcome';
import UsersByCommunity from './UsersByCommunity';
import {Bar, Chart} from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
    margin: {margin: '5%'}
};

const Dashboard = () => {
    // eslint-disable-next-line
    const [sessions, setSessions] = useState<TrainingSession[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const version = useVersion();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
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

    const fetchSubjects = useCallback(async () => {
        dataProvider.getList('subjects', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setSubjects(data);
        });
    }, [dataProvider]);

    const subjectNames = subjects.map((sub) => {
        return sub.name
    } )

    const barData = {
        labels: subjectNames,
        datasets: [
          {
            label: 'Individuals Trained per Subject',
            backgroundColor: 'rgba(0, 99, 155, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56, 67, 65]
          }
        ]
      }

    useEffect(() => {
        fetchSessions();
        fetchUsers();
        fetchOrganizations();
        fetchSubjects();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps
    console.log('====================================>', users, organizations, sessions, subjects, subjectNames)

    const totalTrained = sessions.reduce((accumulator, session) => {
        return accumulator + Number(session.groupSizeNum)
    }, 0)

    const totalCommunities = organizations.reduce((accumulator, org) => {
        return accumulator + Number(org.communities.length)
    }, 0)

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
        <div style={{'margin': '5%'}}>
            <div style={{'margin': '5%', 'display': 'flex'}}>
            <Card style={{'maxWidth': '20%', 'margin': '1%'}}>
                    <CardHeader title={translate('# of Communities Served')} />
                    <CardContent>{totalCommunities}</CardContent>
                </Card>
                <Card style={{'maxWidth': '20%', 'margin': '1%'}}>
                    <CardHeader title={translate('# of Individuals Trained')} />
                    <CardContent>{totalTrained}</CardContent>
                </Card>
                <Card style={{'maxWidth': '20%', 'margin': '1%'}}>
                    <CardHeader title={translate('# of Maintenance Checklists completed')} />
                    <CardContent>{sessions.length}</CardContent>
                </Card>
                <Card style={{'maxWidth': '20%', 'margin': '1%'}}>
                    <CardHeader title={translate('Total # of Users')} />
                    <CardContent>{users.length}</CardContent>
                </Card>
            </div>
            <div style={{'margin': '5%'}}>
                <Bar
                    data={barData}
                    options={{
                        /* @ts-ignore */
                        // title:{
                        // display:true,
                        // text:'Average Rainfall per month',
                        // fontSize:20
                        // },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                />
            </div>
            <div style={{'margin': '5%'}}>
                <iframe src='http://localhost:3000/#/diagnosticLogs' width={1000} height={300}/>
                {/* <MaintenanceLogList /> */}
            </div>
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
        </div>
    );
};

export default Dashboard;
