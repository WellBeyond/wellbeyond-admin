import * as React from "react";

import {Create, FormTab, required, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

const SystemTypeCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
        </SimpleForm>
    </Create>
);

export default SystemTypeCreate;