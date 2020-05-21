import * as React from "react";

import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    List,
    ReferenceField,
    SelectField,
    SingleFieldList,
    TextField
} from "react-admin";
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
                <TextField source="name" label="Subject name" className={classes.nameColumn}/>
                <BooleanField source="isPublished" label="Published?"/>
                <SelectField source="locale" label="Language" choices={[
                    {id: 'en', name: 'English'},
                    {id: 'fr', name: 'French'},
                    {id: 'hi', name: 'Hindi'},
                    {id: 'sw', name: 'Swahili'}
                ]}/>
                <ArrayField label="Lessons" source="lessons">
                    <SingleFieldList>
                        <ReferenceField
                            source={'lessonId'}
                            basePath={'/lessons'}
                            reference="lessons"
                        >
                            <ChipField source="name"/>
                        </ReferenceField>
                    </SingleFieldList>
                </ArrayField>
            </Datagrid>
        </List>
    );
}

export default SubjectList;