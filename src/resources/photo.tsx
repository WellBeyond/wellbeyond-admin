import * as React from "react";
import Icon from '@material-ui/icons/PhotoLibrary';
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

import {CloudinaryPhotoInput} from '../components/CloudinaryPhotoInput'

import RichTextInput from "ra-input-rich-text";
import {ICloudinaryUploadResult} from "../lib/cloudinary";

export interface IPhoto {
    title: string,
    description: string,
    data: ICloudinaryUploadResult,
    symptomId?: string,
    questionId?: string,
    solutionId?: string,
    created_at: Date
}

const validatePhoto = (values:IPhoto) => {
    const errors:any = {};
    if (!values.title) {
        errors.title = ['A title is required'];
    }
    if (!values.data) {
        errors.data = ['You must upload or select a photo file'];
    }
    return errors
};

export const PhotoIcon = Icon;
export const PhotoList = (props: object) => (
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

export const PhotoShow = (props: object) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <RichTextField source="description" />
            <ImageField source="data.thumbnail_url" />
        </SimpleShowLayout>
    </Show>
);

export const PhotoCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm validate={validatePhoto}>
            <ReferenceInput label="Symptom" source="symptomId" reference="symptoms">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="title" />
            <CloudinaryPhotoInput  source='data' inline={true}>Upload Photo</CloudinaryPhotoInput>
        </SimpleForm>
    </Create>
);

export const PhotoEdit = (props: object) => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput label="Sympton" source="symptomId" reference="symptoms">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="title" fullWidth={true} />
            <CloudinaryPhotoInput  source='data'>Upload Photo</CloudinaryPhotoInput>
            <RichTextInput source="description" />
        </SimpleForm>
    </Edit>
);