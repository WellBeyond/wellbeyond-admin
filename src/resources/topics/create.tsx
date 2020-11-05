import * as React from "react";

import {Create, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import {PhotoInput} from "../../components/PhotoInput";

const TopicCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm toolbar={<CustomCreateToolbar />}>
            <TextInput source="name" fullWidth={true}/>
            <RichTextInput source="description" fullWidth={true}/>
            <PhotoInput source='photo' label="Photo" />
        </SimpleForm>
    </Create>
);

export default TopicCreate;