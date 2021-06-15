import * as React from "react";

import {Create, required, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

const SystemTypeCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar />}>
                <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
                <RichTextInput source="description" fullWidth={true}/>
        </SimpleForm>
    </Create>
);

export default SystemTypeCreate;