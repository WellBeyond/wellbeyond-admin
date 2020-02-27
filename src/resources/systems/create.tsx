import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput, Tab
} from "react-admin";
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