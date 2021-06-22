import * as React from "react";

import {
    ArrayInput,
    FormTab,
    ReferenceInput,
    required,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import {PhotoInput} from "../../components/PhotoInput";
import RichTextInput from "ra-input-rich-text";
import {VideoInput} from "../../components/VideoInput";

interface FormDataConsumerProps {
    formData: any;
}

const DiagnosticEdit = (props: any) => {
    return <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <ReferenceInput label="Problem" source="symptomId" reference="symptoms" fullWidth={true} allowEmpty={false} validate={required('Please select a problem')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="name" label="Yes/No Question Text" fullWidth={true} allowEmpty={false} validate={required('Please enter a yes/no question')}/>
                <RichTextInput source="instructions" label="Explain how to check for this (optional)" fullWidth={true}/>
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

export default DiagnosticEdit;