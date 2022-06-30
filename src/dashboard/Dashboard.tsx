import React, {CSSProperties, useCallback, useEffect, useState,} from 'react';
import { useDataProvider, useTranslate, useVersion, Title } from 'react-admin';
import {Theme, useMediaQuery, Card, CardHeader, CardContent} from '@material-ui/core';
import {Organization, Subject, TrainingSession, User} from '../types'

import Welcome from './Welcome';
import UsersByCommunity from './UsersByCommunity';
import {Bar, Chart} from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import DashboardCard from './DashboardCard';
import './DashboardCard.scss';
import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardBarChart from './DashboardBarChart';
import DiagnosticList from '../resources/diagnostics/list';
import {Datagrid, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField} from "react-admin";
import DashboardList from './DashboardList';
import DashboardCardOverall from './DashboardCardOverall';

ChartJS.register(...registerables);

// data need for dashboard list from react admin
const DiagnosticFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceInput label="Problem" source="symptomId" reference="symptoms">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
    margin: {margin: '5%'},
    marginLef: {marginLeft: '5%'},
    marginTops: {marginTop: '2%'}
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

    const individualsTrainedPerSubject = subjects.map((sub) => {
        let a = sessions.filter((v) => (v.subjectId === sub.id)).length;
        return a
    } )

    const individualsTrainedPerSubjectBarData = {
        labels: subjectNames,
        datasets: [
          {
            label: 'Individuals Trained per Subject',
            backgroundColor: 'rgba(0, 99, 155, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: individualsTrainedPerSubject
          }
        ]
    }

    const KnowledgeGainedBarData = {
        labels: subjectNames,
        datasets: [
          {
            label: 'Knowledge Gained',
            backgroundColor: 'rgba(0, 99, 155, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: individualsTrainedPerSubject
          }
        ]
    }

    const timeSpentCollectingWaterBarData = {
        labels: subjectNames,
        datasets: [
          {
            label: 'Total time spent collecting water',
            backgroundColor: 'rgba(0, 99, 155, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: individualsTrainedPerSubject
          }
        ]
    }

    const totalFunctionalWaterTimeBarData = {
        labels: subjectNames,
        datasets: [
          {
            label: 'How often is water source functional',
            backgroundColor: 'rgba(0, 99, 155, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: individualsTrainedPerSubject
          }
        ]
    }

    useEffect(() => {
        fetchSessions();
        fetchUsers();
        fetchOrganizations();
        fetchSubjects();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps
    console.log('====================================>', users, organizations, sessions, subjects, subjectNames, individualsTrainedPerSubject)

    const totalTrained = sessions.reduce((accumulator, session) => {
        return accumulator + Number(session.groupSizeNum)
    }, 0)

    const totalCommunities = organizations.reduce((accumulator, org) => {
        return accumulator + Number(org.communities.length)
    }, 0)

    return isXSmall ? (
        <div>
            <div className='cardPadding'>
                {/* section Title */}
                <div style={{ marginLeft: '10px' }}>
                    <DashboardSectionHeader sectionTitle={translate('OVERVIEW')} />
                </div>
                {/* detailed cards */}
                <DashboardCard cardContent={totalCommunities} cardTitle={translate('No. of Communities Served')} />
                <DashboardCard cardContent={totalTrained} cardTitle={translate('No. of Individuals Trained')} />
                {/* <DashboardCard cardContent={sessions.length} cardTitle={translate('No. of Maintenance Checklists completed')} /> */}
                <DashboardCard cardContent={users.length} cardTitle={translate('Total No. of Users')} />
            </div> 
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
            <div className='cardPadding'>
                {/* section Title */}
                <div style={{ marginLeft: '1%' }}>
                    <DashboardSectionHeader sectionTitle={translate('OVERVIEW')} />
                </div>
                {/* detailed cards */}
                <div style={{'display': 'flex'}}>
                    <DashboardCard cardContent={totalCommunities} cardTitle={translate('No. of Communities Served')} />
                    <DashboardCard cardContent={totalTrained} cardTitle={translate('No. of Individuals Trained')} />
                </div>
                <div style={{'display': 'flex'}}>
                    {/* <DashboardCard cardContent={sessions.length} cardTitle={translate('No. of Maintenance Checklists completed')} /> */}
                    <DashboardCard cardContent={users.length} cardTitle={translate('Total No. of Users')} />
                </div>
            </div> 
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
        <div >
            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                    <DashboardSectionHeader sectionTitle={translate('OVERVIEW')} />
            </div>
            {/* detailed cards */}
            <div style={{'marginLeft': '5%', 'display': 'flex',  'flexGrow': 1, 'flexBasis': '0',}}>
                <DashboardCard cardContent={totalCommunities} cardTitle={translate('No. of Communities Served')} />
                <DashboardCard cardContent={totalTrained} cardTitle={translate('No. of Individuals Trained')} />
                <DashboardCard cardContent={sessions.length} cardTitle={translate('No. of Maintenance Checklists completed')} />
                <DashboardCard cardContent={users.length} cardTitle={translate('Total No. of Users')} />
                {/* <div className="cardBody">
                <UsersByCommunity users={users} organizations={organizations} />
                </div> */}
            </div> 

            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                <DashboardSectionHeader sectionTitle={translate('SYSTEM OVERVIEW')} />
            </div>

            <div style={{ marginLeft: '5%', 'display': 'flex' }}>
                {/* Piechart components */}
                <div style={{margin: '1%'}}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
                <div style={{margin: '1%'}}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
                <div style={{margin: '1%'}}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
            </div>

            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                <DashboardSectionHeader sectionTitle={translate('COMMUNITY TRAININGS')} />
            </div>

            <div style={{ marginLeft: '5%', 'display': 'flex' }}>
                <DashboardBarChart title={''} data={individualsTrainedPerSubjectBarData} />
                <DashboardCardOverall cardContent={totalCommunities} cardTitle={translate('Overall Knowledge gained across all communities & all trainings')} />
                {/* <DashboardBarChart title={''} data={KnowledgeGainedBarData} /> */}
            </div>

            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                <DashboardSectionHeader sectionTitle={translate('IMPACT MEASUREMENTS')} />
            </div>

            <div style={{ marginLeft: '5%', 'display': 'flex' }}>
                {/* barchart components */}
                <DashboardBarChart title={''} data={timeSpentCollectingWaterBarData} />
                <DashboardCardOverall cardContent={0} cardTitle={translate('')} />
                {/* <DashboardBarChart title={''} data={totalFunctionalWaterTimeBarData} /> */}
            </div>

            {/* section Title */}
            {/* <div style={{ marginLeft: '6%' }}>
                <DashboardSectionHeader sectionTitle={translate('DIAGNOSTIC LIST')} />
            </div> */}

            {/* <MaintenanceLogList /> */}
            {/* <div style={{ marginLeft: '6%', }}>
                <iframe style={ styles.marginTops} src='http://localhost:3000/#/diagnosticLogs' width={1130} height={300}/>
                
            </div> */}
            {/* <div style={{margin: '1%'}}>
                <div style={ styles.marginLef}>
                    <div style={styles.singleCol}>
                        <Welcome />
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default Dashboard;
