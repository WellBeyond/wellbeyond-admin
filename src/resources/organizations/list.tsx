import * as React from "react";

import {ArrayField, ChipField, Datagrid, List, SingleFieldList, TextField} from "react-admin";

const OrganizationList = (props: object) => {
    return (
        <List {...props}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Organization Name" />
                <ArrayField label="Communities" source="communities">
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ArrayField>
            </Datagrid>
        </List>
    );
}

export default OrganizationList;