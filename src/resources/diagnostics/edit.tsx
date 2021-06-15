import * as React from "react";

import {ArrayInput, FormTab, SimpleFormIterator, TabbedForm, TextInput} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import {makeStyles} from '@material-ui/core/styles';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import {PhotoInput} from "../../components/PhotoInput";
import RichTextInput from "ra-input-rich-text";
import {VideoInput} from "../../components/VideoInput";

interface FormDataConsumerProps {
    formData: any;
}
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: 10,
        marginRight: '20px',
        marginBottom: 10,
        width: '95%'
    },
    header: {
        textAlign: 'center',
        width: '100%'
    }
}));

const DiagnosticEdit = (props: any) => {
    const classes = useStyles();
    return <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" label="Yes/No Question Text" fullWidth={true}/>
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