import React from "react";

import {ArrayInput, FormTab, ReferenceInput, SelectInput, SimpleFormIterator, TabbedForm, TextInput} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import OrderedFormIterator from '../../components/OrderedFormIterator';
import RichTextInput from "ra-input-rich-text";
import AddSolution from "./AddSolution";
import {makeStyles} from '@material-ui/core/styles';
import {PhotoInput} from "../../components/PhotoInput";
import {VideoInput} from "../../components/VideoInput";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
const SymptomEdit = (props: any) => {
    const classes = useStyles();
    return (
        <CustomEdit {...props}>
            <TabbedForm>
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                    <RichTextInput source="description" fullWidth={true}/>
                </FormTab>
                <FormTab label="Potential Solutions">
                    <Paper className={classes.paper}>
                        <Typography variant="body1" className={classes.header} gutterBottom>
                            Enter the list of potential solutions to this symptom in the
                            order in which they should be tried.  You may want to prioritize the
                            easiest solutions first or the most likely ones first or some combination
                            of the two.
                        </Typography>
                    </Paper>
                    <ArrayInput source="solutions" label="">
                        <OrderedFormIterator addButton={<AddSolution />}>
                            <ReferenceInput label="Solution"
                                            source="solutionId"
                                            reference="solutions"
                                            disabled={true}
                                            sort={{ field: 'name', order: 'ASC' }}
                                            fullWidth={true}>
                                <SelectInput optionText="name"/>
                            </ReferenceInput>
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab label="Potential Root Causes">
                    <Paper className={classes.paper}>
                        <Typography variant="body1" className={classes.header} gutterBottom>
                            You can branch off into diagnosing another symptom by setting it as a root cause for this
                            problem.  You can also specify some conditions to look for before you branch off into that
                            root cause symptom.
                        </Typography>
                    </Paper>
                    <ArrayInput source="causes" label="">
                        <OrderedFormIterator>
                            <ReferenceInput label="Root Cause Symptom" source="symptomId" reference="symptoms" fullWidth={true}>
                                <SelectInput optionText="name" fullWidth={true}/>
                            </ReferenceInput>
                            <ArrayInput source="conditions" label="What would lead you to think this is the root cause?">
                                <SimpleFormIterator>
                                    <ReferenceInput label="Fact" source="factId" reference="facts" fullWidth={true}>
                                        <SelectInput optionText="name" fullWidth={true} />
                                    </ReferenceInput>
                                    <SelectInput source="relationship" label="Relationship" fullWidth={true} choices={[
                                        {id: '==', name: 'Equals'},
                                        {id: '<', name: 'Is Less Than'},
                                        {id: '<=', name: 'Is Less Than Or Equal To'},
                                        {id: '>', name: 'Is Greater Than'},
                                        {id: '>=', name: 'Is Greater Than Or Equal To'}
                                    ]}/>
                                    <TextInput source="value" label="Value" fullWidth={true} />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab label="Photos">
                    <ArrayInput source="photos" label="">
                        <SimpleFormIterator>
                            <PhotoInput source="url" label="Photo" />
                            <TextInput source="title" label="Photo Title" fullWidth={true}/>
                            <RichTextInput source="description" label="Photo Description" fullWidth={true}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab label="Videos">
                    <ArrayInput source="photos" label="">
                        <SimpleFormIterator>
                            <VideoInput source="url" label="Video" />
                            <TextInput source="title" label="Video Title" fullWidth={true}/>
                            <RichTextInput source="description" label="Video Description" fullWidth={true}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
};

export default SymptomEdit;