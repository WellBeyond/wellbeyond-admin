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
    TextField,
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

const addMaintenanceLogData = (row:any, record:any, steps:any, checklists:any, maintenanceLogs:any) => {
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
    let checklists:any = {};
    let maintenanceLogs:any = {}

    dataProvider.getList('checklists', {
        filter: { },
        pagination: { page: 1, perPage: 1000 },
    }).then(({ data }:any) => {
        data.forEach((row:any) => {checklists[row.id] = row});
        dataProvider.getList('maintenanceLogs', {
            filter: { },
            pagination: { page: 1, perPage: 1000 },
        }).then(({ data }:any) => {
            data.forEach((row:any) => {maintenanceLogs[row.id] = row});
            fetchRelatedRecords(records, 'userId', 'users').then((users:any) => {
                const data = records.map((record:any) => {

                    const user:any = users[record.userId] || {};
                    const steps:any = record.steps
                    const checklistFrequency:any = (checklists[record.checklistId] && checklists[record.checklistId].frequency) || 'unspecified frequency'
                    const lastChecklistUpdate = new Date(record.started)
                    const checklistNextDueDate:any = () => {
                        switch (checklistFrequency) {
                            case 'daily':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 1)
                            case 'weekly':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 7)
                            case 'biweekly':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 14)
                            case 'monthly':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 30)
                            case 'quaterly':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 91)
                            case 'semi-annual':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 182)
                            case 'annual':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 365)
                            case 'unspecified frequency':
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 30)
                            default:
                                return new Date(lastChecklistUpdate.getFullYear(), lastChecklistUpdate.getMonth(),lastChecklistUpdate.getDate() + 30)
                        }
                    }
                    const complianceStatus = new Date(checklistNextDueDate().getFullYear(), checklistNextDueDate().getMonth(), checklistNextDueDate().getDate() + 30) < 
                        new Date() ? 'compliant' : 'non-compliant'
                    let row:any = {
                        community: record.community || user.community || '',
                        name: record.name,
                        completed: record.started,
                        completedCount: `${record.completedCount} / ${record.stepCount}`,
                        NextChecklistDueDate: checklistNextDueDate(),
                        ComplianceStatus: complianceStatus,
                        OrganizationStatus: record.organizationStatus || '',
                        statusUpdateDate: record.lastupdate,
                        Checkedby: record.updatedby,

                    }
                    addMaintenanceLogData(row, record, steps, checklists, maintenanceLogs);
                    return row;
                });
                jsonExport(data, {}, (err:any, csv:any) => {;
                    downloadCSV(csv, 'maintenance logs');
                });
            });
        });
    });
}

const MaintenanceLogList = (props: object) => {
    {console.log({props})}
    return (
        <div>
            <div>
                
            </div>
            <List {...props}
                filters={<MaintenanceLogFilter />}
                perPage={25}
                sort={{field: 'started', order: 'DESC'}}
                exporter={exporter}
                filterDefaultValues={{ archived: false }}>
                <Datagrid optimized rowClick="edit">
                    <TextField source="community" label="Community"/>
                    <DateField source="completed" label="Completion Date" showTime={true}/>
                    <NumberField source="completedCount" label="Steps Completed"/>
                    <NumberField source="stepCount" label=" Total Steps"/>
                    <ReferenceField
                        label={"Performed By"}
                        source={'userId'}
                        basePath={'/users'}
                        reference="users">
                        <TextField source="name"/>
                    </ReferenceField>
                    <ReferenceField
                        label={"System"}
                        source={'systemId'}
                        basePath={'/systems'}
                        reference="systems">
                        <TextField source="name"/>
                    </ReferenceField>
                    <ReferenceField
                        label={"Organization"}
                        source={'organizationId'}
                        basePath={'/organizations'}
                        reference="organizations">
                        <TextField source="name"/>
                    </ReferenceField>
                    <TextField label={'Organization Status'}
                        source='organizationStatus' /> 
                    <TextField source="updatedby" label={"Updated By"} reference='users'/>
                    <DateField label={'Last Update'}
                        source='lastupdate' /> 
                </Datagrid>
            </List>
        </div>
    );
}

export default MaintenanceLogList;