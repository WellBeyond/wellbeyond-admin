import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {Create, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import {PhotoInput} from "../../components/PhotoInput";

const subjectDefaultValue = { locale: 'en', lessons: [] };
const SubjectCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm initialValues={subjectDefaultValue} toolbar={<CustomCreateToolbar />}>
            <TextInput source="name" fullWidth={true}/>
            <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                {id: 'en', name: 'English'},
                {id: 'sw', name: 'Swahili'}
            ]}/>
            <RichTextInput source="description" fullWidth={true}/>
            <PhotoInput source='photo' label="Icon" />
        </SimpleForm>
    </Create>
);

export default SubjectCreate;