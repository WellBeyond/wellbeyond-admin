import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput, Tab, SelectInput, FormTab
} from "react-admin";
import { parse } from 'query-string';
import RichTextInput from "ra-input-rich-text";
import {PhotoInput} from "../../components/PhotoInput";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

type MyProps = {
    location?: {[index: string]:any},
    toolbar?: object
}

const lessonDefaultValue = { pages: [] };
const LessonCreate = (props: MyProps) => {
    const {toolbar, location} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar />} initialValues={lessonDefaultValue}>
                <TextInput source="name" fullWidth={true}/>
                <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                    {id: 'en', name: 'English'},
                    {id: 'sw', name: 'Swahili'}
                ]}/>
                <RichTextInput source="description" fullWidth={true}/>
                <PhotoInput source='photo' label="Photo" />
            </SimpleForm>
        </Create>
    );
};

export default LessonCreate;