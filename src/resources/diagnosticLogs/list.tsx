import { translate } from "react-admin";
import React, {CSSProperties, useCallback, useEffect, useState,} from 'react';
import {
    ArrayField,
    BooleanInput, ChipField,
    Datagrid,
    DateField,
    Filter,
    List,
    ReferenceField,
    ReferenceInput, SelectField,
    SelectInput, SingleFieldList,
    TextField
} from "react-admin";

import DashboardBarChart from "../../dashboard/DashboardBarChart";
import DashboardCardOverall from "../../dashboard/DashboardCardOverall";
import {Organization, Subject, TrainingSession, User} from "../../types";
import { useVersion } from "react-admin";
import { useDataProvider } from "react-admin";
import { useTranslate } from "react-admin";
import UsersByCommunity from "../../dashboard/UsersByCommunity";
import DashboardSectionHeader from "../../dashboard/DashboardSectionHeader";

const DiagnosticLogFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="System" source="systemId" reference="systems" fullWidth={true} allowEmpty={false}>
            <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
        </ReferenceInput>
        <BooleanInput label="Archived" source="archived" />
    </Filter>
);

const DiagnosticLogList = (props: object) => {

    const [sessions, setSessions] = useState<TrainingSession[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const version = useVersion();
    const dataProvider = useDataProvider();
    const translate = useTranslate();

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

    useEffect(() => {
        fetchSessions();
        fetchUsers();
        fetchOrganizations();
        fetchSubjects();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const totalTrained = sessions.reduce((accumulator, session) => {
        return accumulator + Number(session.groupSizeNum)
    }, 0)

    const totalCommunities = organizations.reduce((accumulator, org) => {
        return accumulator + Number(org.communities.length)
    }, 0)

    return (
        <div>
            {/* section Title */}
            <div style={{ marginLeft: '1%' }}>
                <DashboardSectionHeader sectionTitle={translate('COMMUNITY TRAININGS OVERVIEW')} link='' />
            </div>
            {/* Piechart components */}
            {/* <div style={{ marginLeft: '5%', 'display': 'flex' }}>
                
                <div style={{margin: '1%'}}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
                <div style={{margin: '1%'}}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
                <div style={{margin: '1%'}}>
                    <UsersByCommunity users={users} organizations={organizations} />
                </div>
            </div> */}
            <div style={{ marginLeft: '1%', 'display': 'flex' }}>
                <DashboardCardOverall cardContent={60} cardTitle={translate('Individuals Trained')} />
                <DashboardBarChart title={''} data={individualsTrainedPerSubjectBarData} />
                <DashboardCardOverall cardContent={totalCommunities} cardTitle={translate('Knowledge gained')} />
                {/* <DashboardBarChart title={''} data={KnowledgeGainedBarData} /> */}
            </div>
            <List {...props}
                filters={<DiagnosticLogFilter />}
                perPage={25}
                sort={{field: 'started', order: 'DESC'}}
                filterDefaultValues={{ archived: false }}>
                <Datagrid optimized rowClick="edit">
                <TextField source="community" label="Community"/>
                    {/* <DateField source="started" label="Started" showTime={true}/> */}
                    <DateField source="completed" label="Completed" showTime={true}/>
                    <ArrayField label="Reported Issue" source="symptoms">
                        <SingleFieldList>
                            <ReferenceField
                                source={'symptomId'}
                                basePath={'/symptoms'}
                                reference="symptoms"
                            >
                                <ChipField source="name"/>
                            </ReferenceField>
                        </SingleFieldList>
                    </ArrayField>
                    <ReferenceField
                        label={"Performed By"}
                        source={'userId'}
                        basePath={'/users'}
                        reference="users">
                        <TextField source="name"/>
                    </ReferenceField>
                    <SelectField source="status" label="Community Reported Status" choices={[
                        // {id: 'open', name: 'Open'},
                        {id: 'resolved', name: 'Resolved'},
                        // {id: 'partial', name: 'Partially Resolved'},
                        {id: 'unresolved', name: 'Unresolved'}
                    ]}/>
                    <SelectField source="adminReportedStatus" label="Organization Status" choices={[
                        {id: 'underreview', name: 'Under Review'},
                        {id: 'issuesreported', name: 'Issues Reported'},
                        {id: 'pendingmaintenance', name: 'Pending Maintenance'},
                        {id: 'contactcommunity', name: 'Contact Community'}
                    ]}/>
                    {/* <ReferenceField
                        label={"Organization"}
                        source={'organizationId'}
                        basePath={'/organizations'}
                        reference="organizations">
                        <TextField source="name"/>
                    </ReferenceField> */}
                    
                    {/* <ReferenceField
                        label={"System"}
                        source={'systemId'}
                        basePath={'/systems'}
                        reference="systems">
                        <TextField source="name"/>
                    </ReferenceField> */}
                    
                    <TextField source="updatedby" label={"Updated By"} reference='users'/>
                    <DateField label={'Last Update'}
                        source='lastupdate' /> 
                    
                </Datagrid>
            </List>
        </div>
    );
}

export default DiagnosticLogList;