import React from "react";

import {
    ArrayInput, BooleanInput,
    Datagrid,
    DeleteButton,
    EditButton,
    FormTab,
    ReferenceArrayInput,
    ReferenceInput,
    ReferenceManyField,
    SelectArrayInput,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import RichTextInput from "ra-input-rich-text";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import AddDiagnosticButton from "./AddDiagnosticButton";
import AddSolutionButton from "./AddSolutionButton";
import OrderedFormIterator from "../../components/OrderedFormIterator";

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
    const {id} = props;
    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />}>
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true} label="Problem Name"/>
                    <ReferenceArrayInput label="Is this problem only relevant to certain system type(s)?" source="systemTypeIds" reference="systemTypes" fullWidth={true}
                                         allowEmpty={true} helperText="Leave this blank if it applies to all types of systems">
                        <SelectArrayInput optionText="name" fullWidth={true} allowEmpty={false}/>
                    </ReferenceArrayInput>
                    <BooleanInput source="hidden" label="Hide this problem?" fullWidth={true}  helperText="Useful if the problem is a root cause that you don't want in the initial selection."/>
                    <RichTextInput source="description" fullWidth={true} label="Problem Description"/>
                </FormTab>
                <FormTab label="Potential Solutions">
                    <Paper className={classes.paper}>
                        <Typography variant="body1" className={classes.header} gutterBottom>
                            List any potential solutions for this problem.  Don't worry about
                            what order they are in; you will prioritize them later under the RULES tab.
                        </Typography>
                    </Paper>
                    <ReferenceManyField
                        label=""
                        reference="solutions"
                        target="symptomId"
                        fullWidth={true}
                        sort={{field: 'name', order: 'ASC'}}>
                        <Datagrid rowClick="edit">
                            <TextField
                                source="name"
                                fullWidth={true}
                                label="Solution Name"/>
                            <EditButton />
                            <DeleteButton redirect={false}/>
                        </Datagrid>
                    </ReferenceManyField>
                    <AddSolutionButton />
                </FormTab>
                <FormTab label="Diagnostic Questions">
                    <Paper className={classes.paper}>
                        <Typography variant="body1" className={classes.header} gutterBottom>
                            List any of the questions that you need to ask to help diagnose the problem and
                            determine which solution(s) you should suggest.  You will connect the questions
                            to the solutions under the RULES tab.
                        </Typography>
                    </Paper>
                    <ReferenceManyField
                        label=""
                        reference="diagnostics"
                        target="symptomId"
                        fullWidth={true}
                        sort={{field: 'name', order: 'ASC'}}>
                        <Datagrid rowClick="edit">
                            <TextField
                                source="name"
                                fullWidth={true}
                                label="Question Text"/>
                            <EditButton />
                            <DeleteButton redirect={false}/>
                        </Datagrid>
                    </ReferenceManyField>
                    <AddDiagnosticButton />
                </FormTab>
                <FormTab label="Rules">
                    <Paper className={classes.paper}>
                        <Typography variant="body1" className={classes.header} gutterBottom>
                            Prioritize the potential solutions and tie them to the relevant questions.  You
                            may want to prioritize according to how easy the solution is to perform or how
                            likely it is to fix the problem.
                        </Typography>
                    </Paper>
                    <ArrayInput source="rules" label=''>
                        <OrderedFormIterator>
                            <ReferenceArrayInput source='systemTypes'
                                                 label="If the system is one of these type(s)"
                                                 fullWidth={true} reference="systemTypes">
                                <SelectArrayInput optionText="name"/>
                            </ReferenceArrayInput>
                            <ReferenceArrayInput source='mustBeYes'
                                                 label="... and these answers are YES"
                                                 fullWidth={true} reference="diagnostics" filter={{symptomId: id}}>
                                <SelectArrayInput optionText="name"/>
                            </ReferenceArrayInput>
                            <ReferenceArrayInput source='mustBeNo'
                                                 label="... and these answers are NO"
                                                 fullWidth={true} reference="diagnostics" filter={{symptomId: id}}>
                                <SelectArrayInput optionText="name"/>
                            </ReferenceArrayInput>
                            <ReferenceInput source='solutionId' label="... then suggest this as a solution" fullWidth={true} reference="solutions" filter={{symptomId: id}}>
                                <SelectInput optionText="name"/>
                            </ReferenceInput>
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab label="Root Causes">
                    <Paper className={classes.paper}>
                        <Typography variant="body1" className={classes.header} gutterBottom>
                            Are there any other problems that might be the actual cause of this symptom?
                        </Typography>
                    </Paper>
                    <ArrayInput source="rootCauses" label=''>
                        <OrderedFormIterator>
                            <ReferenceArrayInput source='systemTypes'
                                                 label="If the system is one of these type(s)"
                                                 fullWidth={true} reference="systemTypes">
                                <SelectArrayInput optionText="name"/>
                            </ReferenceArrayInput>
                            <ReferenceArrayInput source='mustBeYes'
                                                 label="... and these answers are YES"
                                                 fullWidth={true} reference="diagnostics" filter={{symptomId: id}}>
                                <SelectArrayInput optionText="name"/>
                            </ReferenceArrayInput>
                            <ReferenceArrayInput source='mustBeNo'
                                                 label="... and these answers are NO"
                                                 fullWidth={true} reference="diagnostics" filter={{symptomId: id}}>
                                <SelectArrayInput optionText="name"/>
                            </ReferenceArrayInput>
                            <ReferenceInput source='symptomId' label="... then this might be the actual problem" fullWidth={true} reference="symptoms" >
                                <SelectInput optionText="name"/>
                            </ReferenceInput>
                        </OrderedFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
};

export default SymptomEdit;