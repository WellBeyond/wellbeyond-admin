import * as React from "react";

import {Datagrid, DateField, downloadCSV, List, ReferenceField, TextField} from "react-admin";
import jsonExport from 'jsonexport/dist';

const addFormSessionData = (row:any, session:any, formType:any, formSession: any) => {
    if (formSession.forms) {
        console.log("66666666666 e get forms in form session",formSession.forms)
            // formSession.forms.forEach((form:any, idx:number) => {
            //     if (form && form.formId) {
            //         const progress = session.forms[form.formId];
            //         const prefix = 'form-'+(idx+1)+'-';
            //         if (progress) {
            //             row[prefix+'started'] = progress.started;
            //             row[prefix+'completed'] = progress.completed;
            //             row[prefix+'preScore'] = progress.preScore;
            //             row[prefix+'score'] = progress.score;
            //         }
            //     }
            // });
    }
}

const exporter = (records:any, fetchRelatedRecords:any, dataProvider: any) => {
    records.forEach((record:any) => {
        record.userId = record.userId || 'NOUSERID';
        record.formTypeId = record.formTypeId || 'NOformTypeId';
        record.formSessionId = record.formSessionId || 'NOformSessionId';

    });

    let formTypes:any = {};
    let formSessions:any = {};
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
            dataProvider.getList('formSessions', {
                filter: { },
                pagination: { page: 1, perPage: 1000 },
            }).then(({ data }:any) => {
                data.forEach((row:any) => {formSessions[row.id] = row});
                fetchRelatedRecords(records, 'userId', 'users').then((users:any) => {
                    const data = records.map((record:any) => {
                        console.log('========== records', record)
                        const user:any = users[record.userId] || {};
                        const formType:any = formTypes[record.formTypeId] || {};
                        const formSession:any = formSessions[record.id] || {};
                        console.log('Printing form sessions', formSession)
                        let row:any = {
                            form_name: formType.name,
                            submitted_by: user.email,
                            for_organization: record.organization || (user.organizationId && organizations[user.organizationId] ? organizations[user.organizationId].name : user.organization),
                            user_community: record.community || user.community,
                            filled_on: record.started,
                        }
                        addFormSessionData(row, record, formType, formSession);
                        return row;
                    });
                    jsonExport(data, {}, (err:any, csv:any) => {;
                        downloadCSV(csv, 'formSessions');
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
                <ReferenceField label="Form Type" source="formTypeId" reference="formTypes" >
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Form Name" source="formId" reference="forms" >
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="User" source="userId" reference="users" >
                    <TextField source="name" />
                </ReferenceField>
                {/* <ReferenceField label="Form Session ID" source="formSessionId" reference="formSessions" fullWidth={true} allowEmpty={false}>
                        <TextField source="name" />
                    </ReferenceField> */}
                <TextField source="organization"  label="Organization"/>
                <TextField source="community"  label="Community"/>
                <DateField source="started" label="Started"/>
            </Datagrid>
        </List>
    );
}

export default SessionList;