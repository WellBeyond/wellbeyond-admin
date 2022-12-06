import * as React from "react";

import {Datagrid, DateField, downloadCSV, List, NumberField, ReferenceField, TextField} from "react-admin";
import jsonExport from 'jsonexport/dist';
import DashboardCardOverall from "../../dashboard/DashboardCardOverall";
import DashboardBarChart from "../../dashboard/DashboardBarChart";
import DashboardSectionHeader from "../../dashboard/DashboardSectionHeader";
import { User } from "firebase";
import { useVersion, useDataProvider, useTranslate } from "react-admin";
import { TrainingSession, Organization, Subject } from "../../types";

const addLessonData = (row:any, session:any, subject:any) => {
    if (subject.lessons) {
        subject.lessons.forEach((lesson:any, idx:number) => {
            if (lesson && lesson.lessonId) {
                const progress = session.lessons[lesson.lessonId];
                const prefix = 'lesson-'+(idx+1)+'-';
                if (progress) {
                    row[prefix+'started'] = progress.started;
                    row[prefix+'completed'] = progress.completed;
                    row[prefix+'preScore'] = progress.preScore;
                    row[prefix+'score'] = progress.score;
                }
            }
        });
    }
}

const exporter = (records:any, fetchRelatedRecords:any, dataProvider: any) => {
    records.forEach((record:any) => {
        record.userId = record.userId || 'NOUSERID';
        record.subjectId = record.subjectId || 'NOSUBJECTID';
    });
    let subjects:any = {};
    let lessons:any = {};
    let organizations:any = {};
    dataProvider.getList('organizations', {
        filter: { },
        pagination: { page: 1, perPage: 1000 },
    }).then(({ data }:any) => {
        data.forEach((row:any) => {organizations[row.id] = row});
        dataProvider.getList('subjects', {
            filter: { },
            pagination: { page: 1, perPage: 1000 },
        }).then(({ data }:any) => {
            data.forEach((row:any) => {subjects[row.id] = row});
            dataProvider.getList('lessons', {
                filter: { },
                pagination: { page: 1, perPage: 1000 },
            }).then(({ data }:any) => {
                data.forEach((row:any) => {lessons[row.id] = row});
                fetchRelatedRecords(records, 'userId', 'users').then((users:any) => {
                    const data = records.map((record:any) => {
                        const user:any = users[record.userId] || {};
                        const subject:any = subjects[record.subjectId] || {};
                        let row:any = {
                            subject: subject.name,
                            trainer_name: user.name,
                            trainer_email: user.email,
                            trainer_organization: record.organization || (user.organizationId && organizations[user.organizationId] ? organizations[user.organizationId].name : user.organization),
                            trainer_community: record.community || user.community,
                            sessionName: record.name,
                            groupType: record.groupType,
                            groupSize: record.groupSizeNum,
                            started: record.started,
                            completed: record.completed,
                        }
                        addLessonData(row, record, subject);
                        return row;
                    });
                    jsonExport(data, {}, (err:any, csv:any) => {;
                        downloadCSV(csv, 'sessions');
                    });
                });
            });
        });
    });
};

const SessionList = (props: object) => {
    const [sessions, setSessions] = React.useState<TrainingSession[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const [organizations, setOrganizations] = React.useState<Organization[]>([]);
    const [subjects, setSubjects] = React.useState<Subject[]>([]);
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

    const fetchSessions = React.useCallback(async () => {
        dataProvider.getList('sessions', {
            filter: { },
            sort: { field: 'started', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setSessions(data);
        });
    }, [dataProvider]);

    const fetchUsers = React.useCallback(async () => {
        dataProvider.getList('users', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setUsers(data);
        });
    }, [dataProvider]);

    const fetchOrganizations = React.useCallback(async () => {
        dataProvider.getList('organizations', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setOrganizations(data);
        });
    }, [dataProvider]);

    const fetchSubjects = React.useCallback(async () => {
        dataProvider.getList('subjects', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
            // @ts-ignore
        }).then(({ data }) => {
            setSubjects(data);
        });
    }, [dataProvider]);

    React.useEffect(() => {
        fetchSessions();
        fetchUsers();
        fetchOrganizations();
        fetchSubjects();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const totalTrained = sessions.reduce((accumulator, session) => {
        return accumulator + Number(session.groupSizeNum)
    }, 0)

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
              return scorePrescoreArray
        }).flat()
        //show scores

        let averagePrescore = preScore/(scorePrescore.length)

        let averageScore = score/(scorePrescore.length)

        let totKnowledgeGained = Math.round(100-(((averageScore - averagePrescore)/(100 - averageScore)) * 100))
        return totKnowledgeGained
    }

    const totalCommunities = organizations.reduce((accumulator, org) => {
        return accumulator + Number(org.communities.length)
    }, 0)
    return (
        <div>
            <div style={{ marginLeft: '1%' }}>
                <DashboardSectionHeader sectionTitle={translate('COMMUNITY TRAININGS OVERVIEW')} link='' />
            </div>
            {/* Piechart components */}
            <div style={{ marginLeft: '1%', 'display': 'flex' }}>
                <DashboardCardOverall cardContent={60} cardTitle={translate('Individuals Trained')} />
                <DashboardBarChart title={''} data={individualsTrainedPerSubjectBarData} />
                <DashboardCardOverall cardContent={totalKnowledgeGained()} cardTitle={translate('Knowledge gained')} />
            </div>
            <List {...props} exporter={exporter}
                perPage={25}
                sort={{field: 'started', order: 'DESC'}}>
                <Datagrid optimized rowClick="edit">
                    <TextField source="community"  label="Community"/>
                    <ReferenceField label="Subject" source="subjectId" reference="subjects" link={false} >
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="groupType" label="Group Type"/>
                    <ReferenceField label="Performed By (Trainer)" source="userId" reference="users" link={false} sortBy="name">
                        <TextField source="name" />
                    </ReferenceField>
                    <NumberField source="groupSizeNum" label="Group Size"/>
                    <DateField source="started" label="Started"/>
                    <DateField source="completed" label="Completed"/>
                    {/* <TextField source="organization"  label="Organization"/> */}
                </Datagrid>
            </List>
        </div>
    );
}

export default SessionList;