import * as React from "react";

import {Create, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import {PhotoInput} from "../../components/PhotoInput";

const subjectDefaultValue = { locale: 'en', lessons: [] };
const SubjectCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm initialValues={subjectDefaultValue} toolbar={<CustomCreateToolbar />}>
            <TextInput source="name" fullWidth={true}/>
            <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
            </ReferenceInput>
            <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                {id: 'en', name: 'English'},
                {id: 'fr', name: 'French'},
                {id: 'hi', name: 'Hindi'},
                {id: 'sw', name: 'Swahili'},
                {id: 'so', name: 'Somali'},
                {id: 'am', name: 'Amharic'}
            ]}/>
            <RichTextInput source="description" fullWidth={true}/>
            <PhotoInput source='photo' label="Icon" />
        </SimpleForm>
    </Create>
);

export default SubjectCreate;