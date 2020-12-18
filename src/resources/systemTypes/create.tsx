import * as React from "react";

import {Create, FormTab, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const SystemTypeCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
        </SimpleForm>
    </Create>
);

export default SystemTypeCreate;