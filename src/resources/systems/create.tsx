import * as React from "react";

import {
    Create,
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
import OrganizationCommunityInput from "../../components/OrganizationCommunityInput";

const SystemCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar/>}>
            <TextInput source="name" fullWidth={true} validate={required('System name is required')}/>

            <OrganizationCommunityInput isRequired={true}/>

            <ReferenceArrayInput label="System Type(s)" source="systemTypeIds" reference="systemTypes" fullWidth={true}
                                 allowEmpty={false} validate={required('Please select one or more system type(s)')}>
                <SelectArrayInput optionText="name" fullWidth={true} allowEmpty={false}/>
            </ReferenceArrayInput>
            <TextInput source="country" label="Country" fullWidth={true}/>
            <NumberInput source="latitude" fullWidth={true}/>
            <NumberInput source="longitude" fullWidth={true}/>
            <RichTextInput source="description" fullWidth={true}/>
        </SimpleForm>
    </Create>
);


export default SystemCreate;