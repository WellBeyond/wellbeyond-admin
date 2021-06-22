import * as React from "react";

import {Datagrid, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField} from "react-admin";

const DiagnosticFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceInput label="Problem" source="symptomId" reference="symptoms">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const DiagnosticList = (props: object) => (
    <List {...props}
          perPage={25}
          filters={<DiagnosticFilter />}
          sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="Question Text"/>
            <ReferenceField
                label="Problem"
                source={'symptomId'}
                sortable={false}
                reference="symptoms">
                <TextField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

export default DiagnosticList;