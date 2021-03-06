import * as React from "react";

import {ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import {CloudinaryVideoInput} from "../../components/CloudinaryVideoInput";
import CustomEdit from "../../components/CustomEdit";

interface FormDataConsumerProps {
    formData: any;
}

const VideoEdit = (props: any) => (
    <CustomEdit {...props} >
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
            <CloudinaryVideoInput  source='data'>Upload Video</CloudinaryVideoInput>
            <RichTextInput source="description" />
        </SimpleForm>
    </CustomEdit>
);

export default VideoEdit;