import * as React from "react";

import {
    BooleanField,
    ChipField,
    Datagrid,
    List,
    ReferenceArrayField,
    ReferenceField,
    SingleFieldList,
    TextField
} from "react-admin";


const UserList = (props: object) => {
    return (
        <List {...props}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <ReferenceField label="Name" source="id" reference="users" link={false}>
                    <TextField source="name" label="Name" />
                </ReferenceField>
                <ReferenceField label="Email Address" source="id" reference="users" link={false}>
                    <TextField source="email" label="Email Address" />
                </ReferenceField>
                <ReferenceArrayField label="Organizations" reference="organizations" source="organizations">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <BooleanField source="isAdmin" label="System Administrator?"/>
            </Datagrid>
        </List>
    );
}

export default UserList;