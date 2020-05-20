import * as React from "react";

import {Datagrid, DateField, List, ReferenceField, TextField} from "react-admin";

const SessionList = (props: object) => {
    return (
        <List {...props}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <ReferenceField label="Subject" source="subjectId" reference="subjects" link={false}>
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Trainer" source="userId" reference="users" link={false}>
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label="Organization" source="userId" reference="users" link={false}>
                    <TextField source="organization" />
                </ReferenceField>
                <ReferenceField label="Community" source="userId" reference="users" link={false}>
                    <TextField source="community" />
                </ReferenceField>
                <TextField source="groupType" label="Group Type" fullWidth={true}/>
                <TextField source="groupSize" label="Group Size" fullWidth={true}/>
                <DateField source="started" label="Started"/>
                <DateField source="completed" label="Completed"/>
            </Datagrid>
        </List>
    );
}

export default SessionList;