import * as React from "react";

import {ChipField, Datagrid, List, ReferenceArrayField, ReferenceField, SingleFieldList, TextField} from "react-admin";

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
            <TextField source="community" label="Community"/>
            <ReferenceArrayField
                label="System Type(s)"
                source={'systemTypeIds'}
                basePath={'/systemTypes'}
                reference="systemTypes">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
            <TextField source="country" label="Country"/>
        </Datagrid>
    </List>
);

export default SystemList;