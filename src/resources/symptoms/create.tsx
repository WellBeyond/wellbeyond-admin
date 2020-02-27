import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput, Tab
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const SymptomCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="name" fullWidth={true} />
        </SimpleForm>
    </Create>
);

export default SymptomCreate;