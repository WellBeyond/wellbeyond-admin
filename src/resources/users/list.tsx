import * as React from "react";

import {BooleanField, Datagrid, List, TextField} from "react-admin";
import OrganizationField from '../../components/OrganizationField'

const UserList = (props: object) => {
    return (
        <List {...props}
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