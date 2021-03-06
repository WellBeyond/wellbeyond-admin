import * as React from "react";

import {
    Create,
    FormTab,
    NumberInput,
    ReferenceArrayInput,
    ReferenceInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

const SystemCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true} validate={required('System name is required')}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceArrayInput label="System Type(s)" source="systemTypeIds" reference="systemTypes" fullWidth={true} allowEmpty={false} validate={required('Please select one or more system type(s)')}>
                    <SelectArrayInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceArrayInput>
                <TextInput source="country" label="Country" fullWidth={true}/>
                <NumberInput source="latitude" fullWidth={true}/>
                <NumberInput source="longitude" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
        </SimpleForm>
    </Create>
);

export default SystemCreate;