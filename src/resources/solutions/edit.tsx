import * as React from "react";

import {
    ArrayInput,
    BooleanInput,
    FormTab,
    ReferenceInput,
    required,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import RichTextInput from "ra-input-rich-text";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}

const SolutionEdit = (props: any) => {
    return <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <ReferenceInput label="Symptom" source="symptomId" reference="symptoms" fullWidth={true} allowEmpty={false} validate={required('Please select a symptom')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="name" fullWidth={true} label="Solution"/>
                <BooleanInput source="askDidItWork" label="Ask the user if he/she was able to peform the fix and if it was successful"
                              fullWidth={true}/>
                <BooleanInput source="askForPhotoAfter" label="Ask for a photo after the problem has been fixed" fullWidth={true}/>
            </FormTab>
            <FormTab label="Instructions">
                <RichTextInput source="instructions" label="Explain how to do the repair" fullWidth={true}/>
            </FormTab>
            <FormTab label="Photos">
                <ArrayInput source="photos" label="">
                    <SimpleFormIterator>
                        <PhotoInput source="url" label="Photo"/>
                        <TextInput source="title" label="Photo Title" fullWidth={true}/>
                        <RichTextInput source="description" label="Photo Description" fullWidth={true}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Videos">
                <ArrayInput source="videos" label="">
                    <SimpleFormIterator>
                        <VideoInput source="url" label="Video"/>
                        <TextInput source="title" label="Video Title" fullWidth={true}/>
                        <RichTextInput source="description" label="Video Description" fullWidth={true}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
};

export default SolutionEdit;