import * as React from "react";

import {Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

type MyProps = {
    toolbar?: object
}
const DiagnosticCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm  toolbar={toolbar || <CustomCreateToolbar/>}>
                <ReferenceInput label="Symptom" source="symptomId" reference="symptoms" fullWidth={true} allowEmpty={false} validate={required('Please select a symptom')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="name" label="Yes/No Question Text" fullWidth={true}/>
            </SimpleForm>
        </Create>);
}

export default DiagnosticCreate;