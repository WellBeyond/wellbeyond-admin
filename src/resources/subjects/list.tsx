import * as React from "react";

import {
    ArrayField,
    BooleanField,
    BooleanInput,
    ChipField,
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

const useStyles = makeStyles({
    nameColumn: {
        display: 'inline-block',
        minWidth: 300,
    }
});

const SubjectFilter = (props:any) => (
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
        <BooleanInput source="isPublished" label="Published?" />
    </Filter>
);

const SubjectList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
            filters={<SubjectFilter/>}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Subject name" className={classes.nameColumn}/>
                <ReferenceField
                    source={'topicId'}
                    basePath={'/topics'}
                    reference="topics">
                    <TextField source="name"/>
                </ReferenceField>
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