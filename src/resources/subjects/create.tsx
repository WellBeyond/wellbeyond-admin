import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput, Tab
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import {PhotoInput} from "../../components/PhotoInput";
const subjectDefaultValue = { lessons: [] };
const SubjectCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm initialValues={subjectDefaultValue} toolbar={<CustomCreateToolbar />}>
            <TextInput source="name" fullWidth={true}/>
            <RichTextInput source="description" fullWidth={true}/>
            <PhotoInput source='photo' />
        </SimpleForm>
    </Create>
);

export default SubjectCreate;