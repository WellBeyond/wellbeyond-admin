import * as React from "react";

import {Create, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import {PhotoInput} from "../../components/PhotoInput";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

type MyProps = {
    location?: {[index: string]:any},
    subject?: any,
    toolbar?: object
}

const lessonDefaultValue = { pages: [] };
const LessonCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar />} initialValues={props.subject ? {locale: props.subject.locale, organizationId: props.subject.organizationId, pages: []} : lessonDefaultValue}>
                <TextInput source="name" fullWidth={true}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                    {id: 'en', name: 'English'},
                    {id: 'fr', name: 'French'},
                    {id: 'hi', name: 'Hindi'},
                    {id: 'sw', name: 'Swahili'}
                ]}/>
                <RichTextInput source="description" fullWidth={true}/>
                <PhotoInput source='photo' label="Photo" />
            </SimpleForm>
        </Create>
    );
};

export default LessonCreate;
