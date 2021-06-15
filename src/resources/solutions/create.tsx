import * as React from "react";

import {BooleanInput, Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

type MyProps = {
    toolbar?: object
}

const SolutionCreate = (props: MyProps) => {
    const {toolbar} = props;

    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar/>}>
                <ReferenceInput label="Symptom" source="symptomId" reference="symptoms" fullWidth={true} allowEmpty={false} validate={required('Please select a symptom')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="name" fullWidth={true} label="Solution"/>
                <BooleanInput source="askDidItWork" label="Ask the user if he/she was able to peform the fix and if it was successful"
                              fullWidth={true}/>
                <BooleanInput source="askForPhotoBefore" label="Ask for a photo of the problem before attempting the fix" fullWidth={true}/>
                <BooleanInput source="askForPhotoAfter" label="Ask for a photo after the problem has been fixed" fullWidth={true}/>
            </SimpleForm>
        </Create>
    );
};

export default SolutionCreate;