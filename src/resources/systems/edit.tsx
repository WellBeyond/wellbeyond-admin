import * as React from "react";

import {
    ArrayInput,
    FormTab,
    NumberInput,
    ReferenceArrayInput,
    ReferenceInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import CustomEditToolbar from "../../components/CustomEditToolbar";
import CustomEdit from "../../components/CustomEdit";

interface FormDataConsumerProps {
    formData: any;
}

const SystemEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true} validate={required('System name is required')}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceArrayInput label="System Type(s)" source="systemTypeIds" reference="systemTypes" fullWidth={true} allowEmpty={false} validate={required('Please select one or more system type(s)')}>
                    <SelectArrayInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceArrayInput>
                <TextInput source="country" label="Country" fullWidth={true}/>
                <NumberInput source="latitude" fullWidth={true}/>
                <NumberInput source="longitude" fullWidth={true}/>
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
    </CustomEdit>
);

export default SystemEdit;