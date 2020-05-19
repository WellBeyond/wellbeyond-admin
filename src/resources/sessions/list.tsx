import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid, DateField, FormTab,
    ImageField,
    List,
    ReferenceField,
    SingleFieldList,
    TextField
} from "react-admin";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    nameColumn: {
        display: 'inline-block',
        minWidth: 300,
    },
    photoColumn: {
        maxWidth: 80,
        maxHeight: 80,
        '& img': {
            maxWidth: '100%'
        }
    }
});

const SessionList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="show">
                <ReferenceField label="Subject" source="subjectId" reference="subjects" >
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="name" label="Description" className={classes.nameColumn}/>
                <ReferenceField label="Trainer" source="userId" reference="users" >
                    <TextField source="name" />
                </ReferenceField>
                <BooleanField source="isCompleted" label="Completed?"/>
            </Datagrid>
        </List>
    );
}

export default SessionList;