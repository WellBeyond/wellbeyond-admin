import * as React from "react";

import {
    ArrayField,
    BooleanField,
    BooleanInput,
    ChipField,
    CloneButton,
    Datagrid,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    SelectField,
    SelectInput,
    SingleFieldList,
    TextField
} from "react-admin";
import {makeStyles} from '@material-ui/core';
import { ImageField } from "react-admin";

const useStyles = makeStyles({
    nameColumn: {
        display: 'inline-block',
        minWidth: 300,
    }
});
const MaintenanceLogFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <SelectInput source="locale" label="Language" choices={[
            {id: 'en', name: 'English'},
            {id: 'fr', name: 'French'},
            {id: 'hi', name: 'Hindi'},
            {id: 'sw', name: 'Swahili'},
            {id: 'so', name: 'Somali'},
            {id: 'am', name: 'Amharic'}
        ]}/>
        <ReferenceInput label="System Type" source="systemTypeId" reference="systemTypes" fullWidth={true} allowEmpty={false}>
            <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
        </ReferenceInput>
        <BooleanInput source="isPublished" label="Published?" />
    </Filter>
);

const MaintenanceLogList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
            filters={<MaintenanceLogFilter />}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="MaintenanceLog name" className={classes.nameColumn}/>
                <CloneButton />
                <ReferenceField
                    source={'organizationId'}
                    basePath={'/organizations'}
                    reference="organizations">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField
                    source={'systemTypeId'}
                    basePath={'/systemTypes'}
                    reference="systemTypes">
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
                <ArrayField label="Steps" source="steps">
                    <SingleFieldList linkType={false}>
                        <ChipField source="name" clickable={false}/>
                    </SingleFieldList>
                </ArrayField>
                <ImageField source="photo"/>
            </Datagrid>
        </List>
    );
}

export default MaintenanceLogList;