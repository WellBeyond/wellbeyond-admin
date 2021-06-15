import * as React from "react";

import {Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: 10,
        marginRight: '20px',
        marginBottom: 10,
        width: '95%',
        border: '1px solid #ccc'
    },
    header: {
        textAlign: 'center',
        width: '100%'
    }
}));

type MyProps = {
    toolbar?: object
}
const DiagnosticCreate = (props: MyProps) => {
    const {toolbar} = props;
    const classes = useStyles();
    return (
        <Create {...props} >
            <SimpleForm  toolbar={toolbar || <CustomCreateToolbar/>}>
                <ReferenceInput label="Symptom" source="symptomId" reference="symptoms" fullWidth={true} allowEmpty={false} validate={required('Please select a symptom')}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <TextInput source="name" label="Yes/No Question Text" fullWidth={true}/>
            </SimpleForm>
        </Create>);
}

export default DiagnosticCreate;