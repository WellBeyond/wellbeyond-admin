import * as React from "react";

import {Datagrid, List, ReferenceField, TextField} from "react-admin";

const SystemList = (props: object) => (
    <List {...props}
          perPage={25}
          sort={{field: 'name', order: 'ASC'}}>
        <Datagrid optimized rowClick="edit">
            <TextField source="name" label="System name"/>
            <ReferenceField
                source={'organizationId'}
                basePath={'/organizations'}
                reference="organizations">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField
                source={'systemTypeId'}
                basePath={'/systemTypes'}
                reference="systemTypes">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="country" label="Country"/>
        </Datagrid>
    </List>
);

export default SystemList;