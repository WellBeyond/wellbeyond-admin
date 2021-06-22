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
                <ReferenceInput label="Problem" source="symptomId" reference="symptoms" fullWidth={true} allowEmpty={false} validate={required('Please select a problem')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="name" fullWidth={true} label="Solution" allowEmpty={false} validate={required('Please enter a name for this solution')}/>
                <BooleanInput source="askDidItWork" label="Ask the user if he/she was able to perform the fix and if it was successful"
                              fullWidth={true}/>
                <BooleanInput source="askForPhotoAfter" label="Ask for a photo after the fix has been attempted" fullWidth={true}/>
            </SimpleForm>
        </Create>
    );
};

export default SolutionCreate;