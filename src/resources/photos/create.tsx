import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput
} from "react-admin";
import { validatePhoto } from './photo';
import {CloudinaryPhotoInput} from "../../components/CloudinaryPhotoInput";

const PhotoCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm validate={validatePhoto}>
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