import React from "react";

import {
    ArrayInput,
    BooleanInput,
    FormDataConsumer,
    FormTab,
    ReferenceField,
    SelectInput, SimpleForm,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import OrderedFormIterator from '../../components/OrderedFormIterator';
import RichTextInput from "ra-input-rich-text";
import AddLesson from "./AddLesson";
import {PhotoInput} from "../../components/PhotoInput";
import CustomEditToolbar from "../../components/CustomEditToolbar";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10
    }
}));


interface FormDataConsumerProps {
    formData: any;
}
const SubjectEdit = (props: any) => {
    const classes = useStyles();
    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} warnWhenUnsavedChanges>
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                    <BooleanInput source="isPublished" label="Published?" fullWidth={true}/>
                    <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                        {id: 'en', name: 'English'},
                        {id: 'fr', name: 'French'},
                        {id: 'hi', name: 'Hindi'},
                        {id: 'sw', name: 'Swahili'}
                    ]}/>
                    <RichTextInput source="description" fullWidth={true}/>
                    <PhotoInput source='photo' label="Icon" />
                </FormTab>
                <FormTab label="Lessons">
                    <ArrayInput source="lessons" label=''>
                        <OrderedFormIterator addButton={<AddLesson />}>
                            <FormDataConsumer {...props}>
                                {({ scopedFormData }:any) => {
                                    return (
                                        <Paper className={classes.paper}>
                                        <ReferenceField
                                            source={'lessonId'}
                                            basePath={'/lessons'}
                                            reference="lessons"
                                            record={scopedFormData}
                                        >
                                            <TextField source="name"/>
                                        </ReferenceField>
                                        </Paper>
                                    );
                                }}
                            </FormDataConsumer>
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
};

export default SubjectEdit;