import * as React from "react";

import {ArrayInput, BooleanInput, FormTab, ReferenceInput, SelectInput, TabbedForm, TextInput} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import RichTextInput from "ra-input-rich-text";
import OrderedFormIterator from "../../components/OrderedFormIterator";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}

const ChecklistEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />} >
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="System Type" source="systemTypeId" reference="systemTypes" fullWidth={true} allowEmpty={true}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={true} />
                </ReferenceInput>
                <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                    {id: 'en', name: 'English'},
                    {id: 'fr', name: 'French'},
                    {id: 'hi', name: 'Hindi'},
                    {id: 'sw', name: 'Swahili'},
                    {id: 'so', name: 'Somali'},
                    {id: 'am', name: 'Amharic'}
                ]}/>
                <SelectInput source="frequency" label="Recommended Frequency" fullWidth={true} choices={[
                    {id: 'daily', name: 'Every Day'},
                    {id: 'weekly', name: 'Once a Week'},
                    {id: 'biweekly', name: 'Every 2 Weeks'},
                    {id: 'monthly', name: 'Once a Month'},
                    {id: 'quarterly', name: 'Every 3 Months'},
                    {id: 'semiannual', name: 'Twice a Year'},
                    {id: 'annual', name: 'Once a Year'}
                ]}/>
                <BooleanInput source="isPublished" label="Published?" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
            <FormTab label="Steps">
                <ArrayInput source="steps" label=''>
                    <OrderedFormIterator>
                        <TextInput source="name" fullWidth={true} label="Step Name"/>
                        <RichTextInput source="instructions" label="Instructions" fullWidth={true}/>
                        <PhotoInput source='photo' />
                        <TextInput source="photoCaption" fullWidth={true} label="Photo Caption"/>
                        <VideoInput source='video' />
                        <TextInput source="videoCaption" fullWidth={true} label="Video Caption"/>
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default ChecklistEdit;