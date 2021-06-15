import * as React from "react";

import {Create, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import RichTextInput from "ra-input-rich-text";

type MyProps = {
    toolbar?: object
}

const SymptomCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar/>}>
                <TextInput source="name" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </SimpleForm>
        </Create>
    );
}

export default SymptomCreate;