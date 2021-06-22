import * as React from "react";

import {Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import RichTextInput from "ra-input-rich-text";

type MyProps = {
    toolbar?: object
}
const DiagnosticCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm  toolbar={toolbar || <CustomCreateToolbar/>}>
                <ReferenceInput label="Problem" source="symptomId" reference="symptoms" fullWidth={true} allowEmpty={false} validate={required('Please select a problem')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="name" label="Yes/No Question Text" fullWidth={true} allowEmpty={false} validate={required('Please enter a yes/no question')}/>
                <RichTextInput source="instructions" label="Explain how to check for this (optional)" fullWidth={true}/>
            </SimpleForm>
        </Create>);
}

export default DiagnosticCreate;