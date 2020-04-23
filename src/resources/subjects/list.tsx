import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    TextField, SelectField,
    ArrayField,
    SingleFieldList, ChipField, ReferenceField
} from "react-admin";
import { makeStyles } from '@material-ui/core';

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
                <SelectField source="locale" label="Language" choices={[
                    {id: 'en', name: 'English'},
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