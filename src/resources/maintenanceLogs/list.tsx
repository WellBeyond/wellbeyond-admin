import * as React from "react";

import {
    BooleanInput,
    Datagrid,
    DateField,
    downloadCSV,
    Filter,
    List,
    NumberField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TextField
} from "react-admin";
import jsonExport from 'jsonexport/dist';

const MaintenanceLogFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="System" source="systemId" reference="systems" fullWidth={true} allowEmpty={false}>
            <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
        </ReferenceInput>
        <ReferenceInput label="Checklist" source="checklistId" reference="checklists" fullWidth={true} allowEmpty={false}>
            <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
        </ReferenceInput>
        <BooleanInput label="Archived" source="archived" />
    </Filter>
);

const addMaintenanceLogData = (row:any, session:any, steps:any) => {
    if (steps) {
        steps.forEach((step:any , idx: number) => {
            if (step.name) {
                row[`step${idx}.name`] = step.name
            } if (step.status) {
                row[`step${idx}.status`] = step.status
            }
            if (step.information) {
                row[`step${idx}.information`] = step.information
            }
            if (step.completed) {
                row[`step${idx}.completed`] = step.completed
            }
            if (step.photo) {
                row[`step${idx}.photo`] = step.photo
            }
            if (step.completedByName) {
                row[`step${idx}.completedByName`] = step.completedByName
            }
        })
    }
}

const exporter = (records:any, fetchRelatedRecords:any, dataProvider: any) => {
    fetchRelatedRecords(records, 'userId', 'users').then((users:any) => {
        const data = records.map((record:any) => {

            const user:any = users[record.userId] || {};
            const steps:any = record.steps
            let row:any = {
                community: record.community || user.community || '',
                name: record.name,
                completed: record.started,
                completedCount: `${record.completedCount} / ${record.stepCount}`
            }
            addMaintenanceLogData(row, record, steps);
            return row;
        });
        jsonExport(data, {}, (err:any, csv:any) => {;
            downloadCSV(csv, 'maintenance logs');
        });
    });
}

const MaintenanceLogList = (props: object) => {
    return (
        <List {...props}
            filters={<MaintenanceLogFilter />}
              perPage={25}
              sort={{field: 'started', order: 'DESC'}}
              exporter={exporter}
              filterDefaultValues={{ archived: false }}>
            <Datagrid optimized rowClick="edit">
                <DateField source="started" label="Started" showTime={true}/>
                <DateField source="completed" label="Completed" showTime={true}/>
                <NumberField source="stepCount" label="#Steps"/>
                <NumberField source="completedCount" label="#Completed"/>
                <ReferenceField
                    label={"Organization"}
                    source={'organizationId'}
                    basePath={'/organizations'}
                    reference="organizations">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="community" label="Community"/>
                <ReferenceField
                    label={"System"}
                    source={'systemId'}
                    basePath={'/systems'}
                    reference="systems">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField
                    label={"Performed By"}
                    source={'userId'}
                    basePath={'/users'}
                    reference="users">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField
                    label={"Checklist"}
                    source={'checklistId'}
                    basePath={'/checklists'}
                    reference="checklists">
                    <TextField source="name"/>
                </ReferenceField>
            </Datagrid>
        </List>
    );
}

export default MaintenanceLogList;