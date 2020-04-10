import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput, Tab
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
const subjectDefaultValue = { lessons: [] };
const SubjectCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm initialValues={subjectDefaultValue}>
            <TextInput source="name" fullWidth={true} />
        </SimpleForm>
    </Create>
);

export default SubjectCreate;