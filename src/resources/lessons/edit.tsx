import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    FormDataConsumer,
    Edit,
    TabbedForm,
    FormTab,
    ReferenceManyField,
    TextInput,
    BooleanInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    EditButton,
    DeleteButton,
    DateField,
    TextField,
    ImageField, SimpleForm, ReferenceInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import { AddChildButton } from '../../components/AddChildButton';
import RichTextInput from "ra-input-rich-text";
import OrderedFormIterator from "../../components/OrderedFormIterator";
import {CloudinaryPhotoInput} from "../../components/CloudinaryPhotoInput";
import {CloudinaryVideoInput} from "../../components/CloudinaryVideoInput";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}

const LessonEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />} warnWhenUnsavedChanges>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
                <PhotoInput source='photo' />
            </FormTab>
            <FormTab label="Questions">
                <ArrayInput source="questions" label={false}>
                    <OrderedFormIterator>
                        <TextInput source="questionText" fullWidth={true} label="Question Text"/>

                        <SelectInput source="correctAnswer" label="Correct Answer" fullWidth={true} choices={[
                            {id: 'yes', name: 'Yes'},
                            {id: 'no', name: 'No'}
                        ]}/>
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Pages">
                <ArrayInput source="pages" label={false}>
                    <OrderedFormIterator>
                        <TextInput source="title" fullWidth={true} label="Page Title"/>
                        <RichTextInput source="text" label="Lesson Text" fullWidth={true}/>
                        <PhotoInput source='photo' />
                        <VideoInput source='video' />
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default LessonEdit;