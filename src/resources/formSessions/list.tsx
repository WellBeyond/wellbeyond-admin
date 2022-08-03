import * as React from "react";
import { useTranslate } from "react-admin";

import { Datagrid, 
    DateField, 
    downloadCSV, 
    List, 
    ReferenceField,
    Filter,
    SelectInput,
    ReferenceInput,
    TextField} from "react-admin";
import jsonExport from 'jsonexport/dist';
import { translate } from "react-admin";
import DashboardSectionHeader from "../../dashboard/DashboardSectionHeader";

const addFormSessionData = (row:any, session:any, formType:any, formSession: any) => {
    if (formSession.formQuestionsWithAnswers) {
        formSession.formQuestionsWithAnswers.forEach((qwithans:any , idx: number) => {
            if (qwithans.questionType === 'yes-no') {
                row[`${qwithans.questionText}`] = qwithans.answer
            } else if (qwithans.questionType === 'choose-one') {
                row[`${qwithans.questionText}`] = qwithans.answer
            } else if (qwithans.questionType === 'additional-info') {

                row[`${qwithans.questionText}`] = qwithans.answer
            } else if (qwithans.questionType === 'multi-select') {
                let rawAnswer = qwithans.answer || {}
                let ans = Object.values(rawAnswer).join()
                row[`${qwithans.questionText}`] = ans
            } else if (qwithans.questionType === 'multi-step-question') {
                let multistepqa = qwithans["multi-step-question"] || []
                multistepqa.forEach((qa:any, index:number) => {
                    let idx = qwithans && qwithans.answer && qwithans.answer[index]
                    if ((typeof(idx)==undefined || typeof(idx)=='boolean')) return
                    row[`${qa.questionText}`] = qa.answer ? qa.answer : idx
                })
            } 
            else if (qwithans.questionType === 'number') {
                row[`${qwithans.questionText}`] = qwithans.answer
            }
            else if (qwithans.questionType === 'photo') {
                qwithans.answer && qwithans.answer.forEach((photo:string)=> {

                    row[`${qwithans.questionText}`] = photo
                })
            }
        })
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
                        const user:any = users[record.userId] || {};
                        const formType:any = formTypes[record.formTypeId] || {};
                        const formSession:any = formSessions[record.id] || {};
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

const UserFilter = (props:any) => (
    <Filter {...props}>
        
        <ReferenceInput label="Form Type" source="formTypeId" reference="formTypes">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Form Name" source="formId" reference="forms">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Filled By" source="userId" reference="users">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const FormSessionList = (props: object) => {
    const translate = useTranslate();
    return (
        <div>
            {/* section Title */}
            <div style={{ marginLeft: '1%' }}>
                <DashboardSectionHeader sectionTitle={translate('FORM SUBMITTIONS LOG')} link=''/>
            </div>
            <List {...props}
                exporter={exporter}
                perPage={25}
                sort={{field: 'started', order: 'DESC'}}
                filters={<UserFilter/>}
                >
                <Datagrid optimized rowClick="edit">
                    <TextField source="community"  label="Community"/>
                    <DateField source="started" label="Submittal Date"/>
                    <ReferenceField label="Form Type" source="formTypeId" reference="formTypes" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Form Name" source="formId" reference="forms" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Submitted By" source="userId" reference="users" >
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField
                        label={"Organization"}
                        source={'organizationId'}
                        basePath={'/organizations'}
                        reference="organizations">
                        <TextField source="name"/>
                    </ReferenceField>
                </Datagrid>
            </List>
        </div>
    );
}

export default FormSessionList;