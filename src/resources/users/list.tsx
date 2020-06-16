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
import EmailOrPhoneField from "../../components/EmailOrPhoneField";


const UserFilter = (props:any) => (
    <Filter {...props}>
        <TextInput source="name" label="Name" />
        <TextInput type="email" source="email" label="Email Address" />
        <TextInput type="phoneNumber" source="phoneNumber" label="Phone Number" />
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
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <EmailOrPhoneField label="Email/Phone"/>
                <OrganizationField label="Organization"/>
                <TextField source="community" label="Community"/>
                <BooleanField source="acceptedTerms" label="Accepted Terms?"/>
            </Datagrid>
        </List>
    );
}

export default UserList;