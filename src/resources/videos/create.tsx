import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {Create, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import {validateVideo} from "./video";
import {CloudinaryVideoInput} from "../../components/CloudinaryVideoInput";

const VideoCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm validate={validateVideo}>
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