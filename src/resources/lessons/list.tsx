import * as React from "react";

import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    ImageField,
    List, ReferenceField,
    SelectField,
    SingleFieldList,
    TextField,
    CloneButton, ReferenceInput, SelectInput, BooleanInput, Filter
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
const LessonFilter = (props:any) => (
    <Filter {...props}>
        <ReferenceInput label="Organization" source="organizationId" reference="organizations">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <SelectInput source="locale" label="Language" choices={[
            {id: 'en', name: 'English'},
            {id: 'fr', name: 'French'},
            {id: 'hi', name: 'Hindi'},
            {id: 'sw', name: 'Swahili'}
        ]}/>
        <BooleanInput source="isPublished" label="Published?" />
    </Filter>
);

const LessonList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
            filters={<LessonFilter />}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Lesson name" className={classes.nameColumn}/>
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
                    {id: 'sw', name: 'Swahili'}
                ]}/>
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