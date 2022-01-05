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
                <BooleanField source="isMaintenanceUser" label="Maintenance User?"/>
                <BooleanField source="isClientAdmin" label="Client Administrator?"/>
                <ReferenceArrayField label="Permitted Resources" reference="admins" source="permittedResources">
                    <SingleFieldList>
                        <ChipField source="id" />
                    </SingleFieldList>
                </ReferenceArrayField>
            </Datagrid>
        </List>
    );
}

export default UserList;