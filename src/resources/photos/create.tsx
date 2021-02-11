import * as React from "react";

import {Create, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import {validatePhoto} from './photo';
import {CloudinaryPhotoInput} from "../../components/CloudinaryPhotoInput";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

const PhotoCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm validate={validatePhoto} toolbar={<CustomCreateToolbar />}>
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
            <CloudinaryPhotoInput  source='data' inline={true}>Upload Photo</CloudinaryPhotoInput>
        </SimpleForm>
    </Create>
);

export default PhotoCreate;