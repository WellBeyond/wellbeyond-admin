import * as React from "react";

import {Create, FormTab, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const SystemCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="System Type" source="systemTypeId" reference="systemTypes" fullWidth={true} allowEmpty={true}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="country" label="Country" fullWidth={true}/>
                <NumberInput source="latitude" fullWidth={true}/>
                <NumberInput source="longitude" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
        </SimpleForm>
    </Create>
);

export default SystemCreate;