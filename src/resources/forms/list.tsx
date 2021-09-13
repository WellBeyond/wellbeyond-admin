import * as React from "react";

import {
    BooleanField,
    BooleanInput,
    CloneButton,
    Datagrid,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    SelectField,
    SelectInput,
    TextField
} from "react-admin";
import {makeStyles} from '@material-ui/core';
import { ReferenceArrayInput, SelectArrayInput } from "react-admin";

const useStyles = makeStyles({
    nameColumn: {
        display: 'inline-block',
        minWidth: 300,
    }
});
const FormFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceArrayInput label="Organization" source="organizationId" reference="organizations">
            <SelectArrayInput optionText="name" fullWidth={true} allowEmpty={false}/>
        </ReferenceArrayInput>
        <SelectInput source="locale" label="Language" choices={[
            {id: 'en', name: 'English'},
            {id: 'fr', name: 'French'},
            {id: 'hi', name: 'Hindi'},
            {id: 'sw', name: 'Swahili'},
            {id: 'so', name: 'Somali'},
            {id: 'am', name: 'Amharic'}
        ]}/>
        <BooleanInput source="isPublished" label="Published?" />
    </Filter>
);

const FormList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
            filters={<FormFilter />}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Form name" className={classes.nameColumn}/>
                <CloneButton />
                <ReferenceField
                    source={'organizationId'}
                    basePath={'/organizations'}
                    reference="organizations">
                    <TextField source="name"/>
                </ReferenceField>
                <SelectField source="locale" label="Language" choices={[
                    {id: 'en', name: 'English'},
                    {id: 'fr', name: 'French'},
                    {id: 'hi', name: 'Hindi'},
                    {id: 'sw', name: 'Swahili'},
                    {id: 'so', name: 'Somali'},
                    {id: 'am', name: 'Amharic'}
                ]}/>
                <BooleanField source="isPublished" label="Published?"/>
            </Datagrid>
        </List>
    );
}

export default FormList;