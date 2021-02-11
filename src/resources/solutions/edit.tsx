import * as React from "react";

import {
    ArrayInput,
    BooleanInput,
    FormTab,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import RichTextInput from "ra-input-rich-text";
import OrderedFormIterator from "../../components/OrderedFormIterator";
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomEditToolbar from "../../components/CustomEditToolbar";

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

const SolutionEdit = (props: any) => {
    const classes = useStyles();
    return <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <BooleanInput source="askAreYouAble" label="Ask if the user is able to perform the fix first"
                              fullWidth={true}/>
                <BooleanInput source="askForPhotoBefore" label="Ask for a before photo" fullWidth={true}/>
                <BooleanInput source="askForPhotoAfter" label="Ask for an after photo" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
            <FormTab label="Preconditions">
                <Paper className={classes.paper}>
                    <Typography variant="body1" className={classes.header} gutterBottom>
                        List any questions that you need to ask before attempting this solution.  If any of
                        these conditions are not true, then the system will not suggest trying this solution to
                        the problem.
                    </Typography>
                </Paper>
                <ArrayInput source="conditions" label="">
                    <OrderedFormIterator>
                        <ReferenceInput label="Fact" source="factId" reference="facts" fullWidth={true}>
                            <SelectInput optionText="name" fullWidth={true}/>
                        </ReferenceInput>
                        <SelectInput source="relationship" label="Relationship" fullWidth={true} choices={[
                            {id: '==', name: 'Equals'},
                            {id: '<', name: 'Is Less Than'},
                            {id: '<=', name: 'Is Less Than Or Equal To'},
                            {id: '>', name: 'Is Greater Than'},
                            {id: '>=', name: 'Is Greater Than Or Equal To'}
                        ]}/>
                        <TextInput source="value" label="Value" fullWidth={true}/>
                    </OrderedFormIterator>
                </ArrayInput>
            </FormTab>
            <FormTab label="Step By Step">
                <Paper className={classes.paper}>
                    <Typography variant="body1" className={classes.header} gutterBottom>
                        Explain how to perform this repair step by step.  
                    </Typography>
                </Paper>
                <ArrayInput source="instructions">
                    <OrderedFormIterator>
                        <RichTextInput source="step" label="Instructions" fullWidth={true}/>
                    </OrderedFormIterator>
                </ArrayInput>
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

export default SolutionEdit;