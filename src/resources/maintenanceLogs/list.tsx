import * as React from "react";

import {Datagrid, DateField, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField} from "react-admin";
import { NumberField } from "react-admin";
import { BooleanInput } from "react-admin";

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

const MaintenanceLogList = (props: object) => {
    return (
        <List {...props}
            filters={<MaintenanceLogFilter />}
              perPage={25}
              sort={{field: 'started', order: 'DESC'}}
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