import * as React from "react";

import {Datagrid, DateField, downloadCSV, List, NumberField, ReferenceField, TextField} from "react-admin";
import jsonExport from 'jsonexport/dist';

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
    return (
        <List {...props} exporter={exporter}
              perPage={25}
              sort={{field: 'started', order: 'DESC'}}>
            <Datagrid optimized rowClick="edit">
                <ReferenceField label="Subject" source="subjectId" reference="subjects" link={false} >
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Trainer" source="userId" reference="users" link={false} sortBy="name">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="organization"  label="Organization"/>
                <TextField source="community"  label="Community"/>
                <TextField source="groupType" label="Group Type"/>
                <NumberField source="groupSizeNum" label="Group Size"/>
                <DateField source="started" label="Started"/>
                <DateField source="completed" label="Completed"/>
            </Datagrid>
        </List>
    );
}

export default SessionList;