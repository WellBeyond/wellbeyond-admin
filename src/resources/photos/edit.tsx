import * as React from "react";

import {ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import {CloudinaryPhotoInput} from "../../components/CloudinaryPhotoInput";
import RichTextInput from "ra-input-rich-text";
import CustomEditToolbar from "../../components/CustomEditToolbar";
import CustomEdit from "../../components/CustomEdit";

const PhotoEdit = (props: object) => (
    <CustomEdit {...props} >
        <SimpleForm toolbar={<CustomEditToolbar />}>
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
    </CustomEdit>
);

export default PhotoEdit;