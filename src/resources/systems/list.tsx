import * as React from "react";

import {Datagrid, List, ReferenceArrayField, ReferenceField, TextField} from "react-admin";

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
            <ReferenceArrayField
                source={'systemTypeIds'}
                basePath={'/systemTypes'}
                reference="systemTypes">
                <TextField source="name"/>
            </ReferenceArrayField>
            <TextField source="country" label="Country"/>
        </Datagrid>
    </List>
);

export default SystemList;