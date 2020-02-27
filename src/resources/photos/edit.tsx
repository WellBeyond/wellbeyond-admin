import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Edit,
    SimpleForm,
    TextInput, ReferenceInput, SelectInput
} from "react-admin";
import {CloudinaryPhotoInput} from "../../components/CloudinaryPhotoInput";
import RichTextInput from "ra-input-rich-text";

const PhotoEdit = (props: object) => (
    <Edit {...props} >
        <SimpleForm>
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
            <CloudinaryPhotoInput  source='data'>Upload Photo</CloudinaryPhotoInput>
            <RichTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export default PhotoEdit;