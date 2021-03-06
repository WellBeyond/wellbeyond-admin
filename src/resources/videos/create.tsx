import * as React from "react";

import {Create, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import {validateVideo} from "./video";
import {CloudinaryVideoInput} from "../../components/CloudinaryVideoInput";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

const VideoCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm validate={validateVideo} toolbar={<CustomCreateToolbar />}>
            <ReferenceInput label="Symptom" source="symptomId" reference="symptoms" fullWidth={true}>
                <SelectInput optionText="name" fullWidth={true}  />
            </ReferenceInput>
            <ReferenceInput label="Fact" source="factId" reference="facts" fullWidth={true}>
                <SelectInput optionText="name"  fullWidth={true} />
            </ReferenceInput>
            <ReferenceInput label="Solution" source="solutionId" reference="solutions" fullWidth={true}>
                <SelectInput optionText="name" fullWidth={true}  />
            </ReferenceInput>
            <TextInput source="name" fullWidth={true} />
            <CloudinaryVideoInput  source='data' inline={true}>Upload Video</CloudinaryVideoInput>
        </SimpleForm>
    </Create>
);

export default VideoCreate;