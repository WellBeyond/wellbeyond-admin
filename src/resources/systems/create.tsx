import * as React from "react";

import {Create, FormTab, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";

const SystemCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
            </FormTab>
        </SimpleForm>
    </Create>
);

export default SystemCreate;