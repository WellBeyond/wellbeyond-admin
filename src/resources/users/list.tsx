import * as React from "react";

import {
    BooleanField,
    Datagrid,
    downloadCSV,
    Filter,
    List,
    ReferenceInput,
    SelectInput,
    TextField,
    TextInput
} from "react-admin";
import OrganizationField from '../../components/OrganizationField'
import EmailOrPhoneField from "../../components/EmailOrPhoneField";
import jsonExport from "jsonexport/dist";

const exporter = (records:any, fetchRelatedRecords:any) => {
    fetchRelatedRecords(records, 'organizationId', 'organizations').then((organizations:any) => {
        records.forEach((record:any) => {
            const organization:any = (record.organizationId && organizations[record.organizationId]);
            record.organization = organization ? organization.name : record.organization;
        });
        jsonExport(records, {}, (err:any, csv:any) => {
            downloadCSV(csv, 'users');
        });
    });
};

const UserFilter = (props:any) => (
    <Filter {...props}>
        <TextInput source="name" label="Name" />
        <TextInput type="email" source="email" label="Email Address" />
        <TextInput type="phoneNumber" source="phoneNumber" label="Phone Number" />
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextField source="community" label="Community"/>
    </Filter>
);

const UserList = (props: object) => {
    return (
        <List {...props} exporter={exporter}
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