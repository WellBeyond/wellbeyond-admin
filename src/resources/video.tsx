import * as React from "react";
import Icon from '@material-ui/icons/VideoLibrary';
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    Create,
    Edit,
    SimpleShowLayout,
    ReferenceInput,
    SimpleForm,
    TextField,
    TextInput,
    SelectInput,
    ShowButton,
    EditButton,
    DeleteButton,
    RichTextField,
    ImageField
} from "react-admin";

import {CloudinaryVideoInput} from '../components/CloudinaryVideoInput'
import {CloudinaryVideoField} from '../components/CloudinaryVideoField'

import RichTextInput from "ra-input-rich-text";
import {ICloudinaryUploadResult} from "../lib/cloudinary";
import { cloudinaryConfig } from "../CLOUDINARY_CONFIG";

export interface IVideo {
    title: string,
    description: string,
    data: ICloudinaryUploadResult,
    symptomId?: string,
    questionId?: string,
    solutionId?: string,
    created_at: Date
}

const validateVideo = (values:IVideo) => {
    const errors:any = {};
    if (!values.title) {
        errors.title = ['A title is required'];
    }
    if (!values.data) {
        errors.data = ['You must upload or select a video file'];
    }
    return errors
};

export const VideoIcon = Icon;
export const VideoList = (props: object) => (
    <List {...props}>
        <Datagrid>
            <TextField source="title"/>
            <ImageField source="data.thumbnail_url" label="Thumbnail"/>
            <ShowButton label="" />
            <EditButton label="" />
            <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

export const VideoShow = (props: object) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <RichTextField source="description" />
            <CloudinaryVideoField source="data" />
        </SimpleShowLayout>
    </Show>
);

export const VideoCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm validate={validateVideo}>
            <ReferenceInput label="Symptom" source="symptomId" reference="symptoms">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="title" />
            <CloudinaryVideoInput source='data' inline={true}>Upload Video</CloudinaryVideoInput>
        </SimpleForm>
    </Create>
);

export const VideoEdit = (props: object) => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput label="Sympton" source="symptomId" reference="symptoms">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="title" fullWidth={true} />
            <CloudinaryVideoInput  source='data'>Upload Video</CloudinaryVideoInput>
            <RichTextInput source="description" />
        </SimpleForm>
    </Edit>
);