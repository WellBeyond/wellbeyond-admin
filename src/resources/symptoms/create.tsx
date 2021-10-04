import * as React from "react";

import {BooleanInput, Create, ReferenceArrayInput, SelectArrayInput, SimpleForm, TextInput} from "react-admin";
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
                <TextInput source="name" fullWidth={true} label="Problem Name"/>
                <ReferenceArrayInput label="Is this problem only relevant to certain system type(s)?" source="systemTypeIds" reference="systemTypes" fullWidth={true}
                                     allowEmpty={true} helperText="Leave this blank if it applies to all types of systems">
                    <SelectArrayInput optionText="name" fullWidth={true} allowEmpty={false}/>
                </ReferenceArrayInput>
                <BooleanInput source="hidden" label="Hide this problem?" fullWidth={true}  helperText="Useful if the problem is a root cause that you don't want in the initial selection."/>
                <RichTextInput source="description" fullWidth={true} label="Problem Description"/>
            </SimpleForm>
        </Create>
    );
}

export default SymptomCreate;