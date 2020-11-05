import * as React from "react";

import {Datagrid, ImageField, List, RichTextField, TextField} from "react-admin";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    nameColumn: {
        display: 'inline-block',
        minWidth: 300,
    }
});

const SubjectList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Topic name" className={classes.nameColumn}/>
                <RichTextField source="description"/>
                <ImageField source="photo"/>
            </Datagrid>
        </List>
    );
}

export default SubjectList;