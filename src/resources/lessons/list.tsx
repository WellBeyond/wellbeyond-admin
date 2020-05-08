import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    TextField, SelectField,
    ArrayField,
    SingleFieldList, ChipField, ReferenceField, ImageField, BooleanField
} from "react-admin";
import { makeStyles } from '@material-ui/core';

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

const LessonList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Lesson name" className={classes.nameColumn}/>
                <BooleanField source="isPublished" label="Published?"/>
                <ImageField source="photo" label="Photo" className={classes.photoColumn}/>
                <ArrayField label="Pages" source="pages">
                    <SingleFieldList linkType={false}>
                        <ChipField source="title" clickable={false}/>
                    </SingleFieldList>
                </ArrayField>
            </Datagrid>
        </List>
    );
}

export default LessonList;