import React, {CSSProperties, useCallback, useEffect, useState,} from 'react';
import { useDataProvider, useTranslate, useVersion } from 'react-admin';
import { Theme, useMediaQuery } from '@material-ui/core';
import {Organization, Subject, TrainingSession, User} from '../types'
import Welcome from './Welcome';
import UsersByCommunity from './UsersByCommunity';
import { Chart as ChartJS, registerables } from 'chart.js';
import DashboardCard from './DashboardCard';
import './DashboardCard.scss';
import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardBarChart from './DashboardBarChart';
import DashboardPieChart from './DashboardPieChart';
import { Filter, ReferenceInput, SelectInput } from "react-admin";
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
    const [diagnosticLogs, setDiagnosticLogs] = useState<[]>([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState<[]>([]);
    const [systems, setSystems] = useState<[]>([]);
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

    const fetchDiagnosticsLogs = useCallback(async () => {
        dataProvider.getList('diagnosticLogs', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setDiagnosticLogs(data);
        });
    }, [dataProvider]);

    const fetchMaintenanceLogs = useCallback(async () => {
        dataProvider.getList('maintenanceLogs', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setMaintenanceLogs(data);
        });
    }, [dataProvider]);

    const fetchSystems = useCallback(async () => {
        dataProvider.getList('systems', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setSystems(data);
        });
    }, [dataProvider]);

    const individualsTrainedPerSubject = subjects.map((sub) => {
        let filteredTrainees = sessions.filter((v) => (v.subjectId === sub.id)).length;
        return filteredTrainees
    } )

    const impactSurveys = {}

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

    const totalKnowledgeGained = () => {
        let allLessons = sessions && sessions.map((session) => {
            return session.lessons
        })

        let score = 0
        let preScore = 0

        let scorePrescore = allLessons.map((lesson) => {
            
            let scorePrescoreArray = lesson && Object.keys(lesson).map((key) => {
                preScore = preScore + (lesson[key].preScore || 0)
                score = score + (lesson[key].score || 0)
                

                return {preScore, score}
              })
            // console.log(scorePrescoreArray?.length)
    
              return scorePrescoreArray
        }).flat()
        //show scores
        console.log({score,preScore})

        let reducedScorePrescore = scorePrescore.reduce((accumulator, arrayItem) => {
            //@ts-ignore
            accumulator.preScore +=  arrayItem.preScore || 0
            //@ts-ignore
            accumulator.score += arrayItem.score || 0
            
            return accumulator
        }, {preScore:0, score: 0})

            //@ts-ignore

        let averagePrescore = (reducedScorePrescore.preScore && reducedScorePrescore.preScore)/(scorePrescore.length)
            //@ts-ignore

        let averageScore = (reducedScorePrescore.score && reducedScorePrescore.score)/(scorePrescore.length)

        let totKnowledgeGained = Math.round(((averageScore - averagePrescore)/(100 - averageScore)) * 100)

        // console.log({reducedScorePrescore, averagePrescore, averageScore, totKnowledgeGained})

        // console.log('inside total knowledge gained', allLessons)
        return totKnowledgeGained
    }

    const timeSpentCollectingWaterBarData = {
        labels: subjectNames,
        datasets: [
          {
            label: 'Impact Survey Phase Completed by Organisation',
            backgroundColor: 'rgba(0, 99, 155, 1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: individualsTrainedPerSubject
          }
        ]
    }

    const communitySystemStatusPieData = {
        labels:["Functioning", "Maintenance Checklist Overdue", "Unresolved Diagnostics", "Maintenance & Diagnostic needs"],
        datasets:[{
         data: [300, 50, 100, 40],
         backgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774"
          ],
         borderWidth: 1
        }]
      };

      const maintenanceStatusPieData = {
        labels:["Compliant", "Overdue"],
        datasets:[{
         data: [300, 50],
         backgroundColor: [
            "#FF5A5E",
            "#5AD3D1"
          ],
         borderWidth: 1
        }]
      };

      const diagnosticStatusPieData = {
        labels:["Issue Reported", "Under Review", "Functioning", "Pending Maintenace", "Contact Community"],
        datasets:[{
         data: [300, 50, 100, 40, 120],
         backgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
          ],
         borderWidth: 1
        }]
      };

    useEffect(() => {
        fetchSessions();
        fetchUsers();
        fetchOrganizations();
        fetchSubjects();
        fetchDiagnosticsLogs();
        fetchMaintenanceLogs();
        fetchSystems();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps
    // console.log('====================================>', users, organizations, sessions, subjects, subjectNames, individualsTrainedPerSubject)
    console.log('============== diagnostic log and maintenance logs and systems', totalKnowledgeGained())

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
                    <DashboardSectionHeader sectionTitle={translate('OVERVIEW')} link='' />
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
                    <DashboardSectionHeader sectionTitle={translate('OVERVIEW')} link='' />
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
                    <DashboardSectionHeader sectionTitle={translate('OVERVIEW')} link=''/>
            </div>
            {/* detailed cards */}
            <div style={{'marginLeft': '5%', 'display': 'flex',  'flexGrow': 1, 'flexBasis': '0'}}>
                <DashboardCard cardContent={totalCommunities} cardTitle={translate('No. of Communities Served')} />
                <DashboardCard cardContent={totalTrained} cardTitle={translate('No. of Individuals Trained')} />
                {/* <DashboardCard cardContent={sessions.length} cardTitle={translate('No. of Maintenance Checklists completed')} /> */}
                <DashboardCard cardContent={users.length} cardTitle={translate('Total No. of Users')} />
            </div> 

            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                <DashboardSectionHeader sectionTitle={translate('SYSTEM OVERVIEW')} link='/systemOverview'/>
            </div>

            <div style={{ marginLeft: '5%', 'display': 'flex'}} className='dashboardPieChartContainer'>
                {/* Piechart components */}
                    <DashboardPieChart data={communitySystemStatusPieData} title='Community System Status' />
                    <DashboardPieChart data={maintenanceStatusPieData} title='Maintenance Status' />
                    <DashboardPieChart data={diagnosticStatusPieData} title='Diagnostic Status' /> 
            </div>

            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                <DashboardSectionHeader sectionTitle={translate('COMMUNITY TRAININGS')} link='/sessions'/>
            </div>

            <div style={{ marginLeft: '5%', 'display': 'flex' }}>
                <DashboardBarChart title={''} data={individualsTrainedPerSubjectBarData} />
                <DashboardCardOverall cardContent={totalKnowledgeGained()} cardTitle={translate('Overall Knowledge gained across all communities & all trainings')} />
            </div>

            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                <DashboardSectionHeader sectionTitle={translate('IMPACT MEASUREMENTS')} link=''/>
            </div>

            <div style={{ marginLeft: '5%', 'display': 'flex', 'width': '47%' }}>
                {/* barchart components */}
                <DashboardBarChart title={''} data={timeSpentCollectingWaterBarData}/>
            </div>
        </div>
    );
};

export default Dashboard;
