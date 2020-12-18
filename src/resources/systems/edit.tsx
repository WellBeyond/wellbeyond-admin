import * as React from "react";

import {
    ArrayInput,
    Edit,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";

interface FormDataConsumerProps {
    formData: any;
}

const SystemEdit = (props: any) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="System Type" source="systemTypeId" reference="systemTypes" fullWidth={true} allowEmpty={true}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={true} />
                </ReferenceInput>
                <TextInput source="country" label="Country" fullWidth={true}/>
                <NumberInput source="latitude" fullWidth={true} step={.00001} min={-90} max={90}/>
                <NumberInput source="longitude" fullWidth={true} step={.00001} min={-180} max={180}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
            <FormTab label="Photos">
                <ArrayInput source="photos" label="">
                    <SimpleFormIterator>
                        <PhotoInput source="url" label="Photo"/>
                        <TextInput source="caption" label="Photo Caption" fullWidth={true}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Videos">
                <ArrayInput source="videos" label="">
                    <SimpleFormIterator>
                        <VideoInput source="url" label="Video"/>
                        <TextInput source="caption" label="Video Caption" fullWidth={true}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default SystemEdit;