import React from "react";

import {
    ArrayInput,
    BooleanInput,
    FormDataConsumer,
    FormTab, ReferenceArrayInput,
    ReferenceField,
    ReferenceInput, SelectArrayInput,
    SelectInput,
    SimpleFormIterator,
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
import Typography from '@material-ui/core/Typography';

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


interface FormDataConsumerProps {
    formData: any;
}
const SubjectEdit = (props: any) => {
    const classes = useStyles();
    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                    <ReferenceInput label="Topic" source="topicId" reference="topics" fullWidth={true} allowEmpty={false}>
                        <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                    </ReferenceInput>
                    <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                        <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                    </ReferenceInput>
                    <ReferenceArrayInput label="Additional Organizations?" source="organizations" reference="organizations"
                                         fullWidth={true}>
                        <SelectArrayInput optionText="name"/>
                    </ReferenceArrayInput>
                    <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                        {id: 'en', name: 'English'},
                        {id: 'fr', name: 'French'},
                        {id: 'hi', name: 'Hindi'},
                        {id: 'sw', name: 'Swahili'},
                        {id: 'so', name: 'Somali'},
                        {id: 'am', name: 'Amharic'}
                    ]}/>
                    <BooleanInput source="isPublished" label="Published?" fullWidth={true}/>
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
                <FormTab label="Group Types">
                    <Paper className={classes.paper}>
                        <Typography variant="body1" className={classes.header} gutterBottom>
                            You can override the standard group types for training sessions here.  If you provide any
                            values, then this list will be shown when someone goes to start a training session instead
                            of the predefined list.  Be sure to enter these in the correct language for this subject.
                        </Typography>
                    </Paper>
                    <ArrayInput source="groupTypes" label="">
                        <SimpleFormIterator>
                            <TextInput source="name" label="Group Type"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
};

export default SubjectEdit;