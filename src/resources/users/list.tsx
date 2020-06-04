import * as React from "react";

import {
    BooleanField,
    Datagrid,
    Filter,
    List,
    ReferenceInput,
    SelectInput,
    TextField,
    TextInput
} from "react-admin";
import OrganizationField from '../../components/OrganizationField'


const UserFilter = (props:any) => (
    <Filter {...props}>
        <TextInput source="name" label="Name" />
        <TextInput type="email" source="email" label="Email Address" />
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const UserList = (props: object) => {
    return (
        <List {...props}
            filters={<UserFilter/>}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Name"/>
                <TextField source="email" label="Email Address"/>
                <OrganizationField label="Organization"/>
                <TextField source="community" label="Community"/>
                <BooleanField source="acceptedTerms" label="Accepted Terms?"/>
            </Datagrid>
        </List>
    );
}

export default UserList;