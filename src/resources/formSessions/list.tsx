import * as React from "react";

import {Datagrid, DateField, downloadCSV, List, ReferenceField, TextField} from "react-admin";
import jsonExport from 'jsonexport/dist';

const addLessonData = (row:any, session:any, subject:any) => {
    if (subject.forms) {
        subject.forms.forEach((lesson:any, idx:number) => {
            if (lesson && lesson.lessonId) {
                const progress = session.forms[lesson.lessonId];
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
        record.formTypeId = record.formTypeId || 'NOformTypeId';
    });
    let formTypes:any = {};
    let forms:any = {};
    let organizations:any = {};
    dataProvider.getList('organizations', {
        filter: { },
        pagination: { page: 1, perPage: 1000 },
    }).then(({ data }:any) => {
        data.forEach((row:any) => {organizations[row.id] = row});
        dataProvider.getList('formTypes', {
            filter: { },
            pagination: { page: 1, perPage: 1000 },
        }).then(({ data }:any) => {
            data.forEach((row:any) => {formTypes[row.id] = row});
            dataProvider.getList('forms', {
                filter: { },
                pagination: { page: 1, perPage: 1000 },
            }).then(({ data }:any) => {
                data.forEach((row:any) => {forms[row.id] = row});
                fetchRelatedRecords(records, 'userId', 'users').then((users:any) => {
                    const data = records.map((record:any) => {
                        const user:any = users[record.userId] || {};
                        const subject:any = formTypes[record.formTypeId] || {};
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
    console.log({props})
    return (
        <List {...props} exporter={exporter}
              perPage={25}
              sort={{field: 'started', order: 'DESC'}}>
            <Datagrid optimized rowClick="edit">
                <ReferenceField label="Form Type" source="formTypeId" reference="formTypes" >
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Form Name" source="formId" reference="forms" >
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="User" source="userId" reference="users" >
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Form Session ID" source="formSessionId" reference="formSessions" fullWidth={true} allowEmpty={false}>
                        <TextField source="name" />
                    </ReferenceField>
                <TextField source="organization"  label="Organization"/>
                <TextField source="community"  label="Community"/>
                <DateField source="started" label="Started"/>
            </Datagrid>
        </List>
    );
}

export default SessionList;