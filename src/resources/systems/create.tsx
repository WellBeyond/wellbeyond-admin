import * as React from "react";

import {BooleanInput, Create, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const SystemCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="questionType"/>
            <TextInput source="questionText"/>
            <BooleanInput source="isSystemProperty"/>
            <RichTextInput source="description"/>
        </SimpleForm>
    </Create>
);

export default SystemCreate;