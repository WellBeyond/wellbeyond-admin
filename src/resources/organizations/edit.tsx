import React, {useEffect, useState} from 'react';
import {
    ArrayField,
    ArrayInput, BooleanField, ChipField, CloneButton,
    Datagrid,
    DateField,
    FormTab, ImageField,
    NumberField,
    ReferenceField,
    ReferenceManyField, SelectField,
    SelectInput,
    SimpleFormIterator, SingleFieldList,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import * as firebase from "firebase/app";
import 'firebase/functions';
import {makeStyles} from '@material-ui/core';
import EmailOrPhoneField from "../../components/EmailOrPhoneField";

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

interface FormDataConsumerProps {
    formData: any;
}

const OrganizationEdit = (props: any) => {

    const classes = useStyles();
    const [companies, setCompanies] = useState();
    const [tags, setTags] = useState();

    useEffect(() => {
        const getIntercomTags = firebase.functions().httpsCallable('getIntercomTags');
        const getIntercomCompanies = firebase.functions().httpsCallable('getIntercomCompanies');
        getIntercomTags().then(function (tags) {
            setTags(tags.data.map((tag:any) => {
                return {id: tag.id, name: tag.name};
            }).sort((a: any, b: any) => {
                return a.name < b.name ? -1 : +1;
            }));
            getIntercomCompanies().then(function (companies) {
                setCompanies(companies.data.map((c:any) => {
                    return {id: c.id, name: c.name};
                }).sort((a: any, b: any) => {
                    return a.name < b.name ? -1 : +1;
                }));
            });
        });
    }, []);

    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                    <SelectInput source="intercomTag" fullWidth={true} label="Intercom Tag" choices={tags}  allowEmpty={true}/>
                    <SelectInput source="intercomCompany" fullWidth={true} label="Default Intercom Company" choices={companies} allowEmpty={true}/>

                    <TextInput source="password" fullWidth={true} label="Organization Password"
                               helperText="Use this to require users who register for this organization to provide a password at signup"/>
                    <TextInput source="contactName" fullWidth={true} label="Contact Name"
                               helperText="Contact information at the organization to help with the registration password"/>
                    <TextInput source="contactEmail" fullWidth={true} label="Contact Email" type="email"
                               helperText="Contact information at the organization to help with the registration password"/>
                </FormTab>
                <FormTab label="Communities">
                    <ArrayInput source="communities" label="">
                        <SimpleFormIterator>
                            <TextInput source="name" label="Community Name" fullWidth={true} />
                            <SelectInput source="intercomCompany" fullWidth={true} label="Intercom Company" choices={companies} allowEmpty={true}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
                <FormTab label="Subjects">
                    <ReferenceManyField
                        label=""
                        addlabel=''
                        reference="subjects"
                        target="organizationId"
                        sort={{field: 'name', order: 'ASC'}}
                    >
                        <Datagrid rowClick="edit">
                            <TextField source="name" label="Subject name"  className={classes.nameColumn}/>
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
                    </ReferenceManyField>
                </FormTab>
                <FormTab label="Lessons">
                    <ReferenceManyField
                        label=""
                        addlabel=''
                        reference="lessons"
                        target="organizationId"
                        sort={{field: 'name', order: 'ASC'}}
                    >
                        <Datagrid rowClick="edit">
                            <TextField source="name" label="Lesson name" className={classes.nameColumn}/>
                            <CloneButton />
                            <SelectField source="locale" label="Language" choices={[
                                {id: 'en', name: 'English'},
                                {id: 'fr', name: 'French'},
                                {id: 'hi', name: 'Hindi'},
                                {id: 'sw', name: 'Swahili'},
                                {id: 'so', name: 'Somali'},
                                {id: 'am', name: 'Amharic'}
                            ]}/>
                            <BooleanField source="isPublished" label="Published?"/>
                            <ImageField source="photo" label="Photo" className={classes.photoColumn}/>
                            <ArrayField label="Pages" source="pages">
                                <SingleFieldList linkType={false}>
                                    <ChipField source="title" clickable={false}/>
                                </SingleFieldList>
                            </ArrayField>
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
                <FormTab label="Users">
                    <ReferenceManyField
                        label=""
                        addlabel=''
                        reference="users"
                        target="organizationId"
                        sort={{field: 'name', order: 'ASC'}}
                    >
                        <Datagrid>
                            <TextField source="name" label="Name"/>
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <EmailOrPhoneField label="Email/Phone"/>
                            <TextField source="community" label="Community"/>
                            <BooleanField source="acceptedTerms" label="Accepted Terms?"/>
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
                <FormTab label="Training Sessions">
                    <ReferenceManyField
                        label=""
                        addlabel=''
                        reference="sessions"
                        target="organizationId"
                        sort={{field: 'started', order: 'DESC'}}
                    >
                        <Datagrid rowClick="edit">
                            <ReferenceField label="Subject" source="subjectId" reference="subjects" link={false} >
                                <TextField source="name" />
                            </ReferenceField>
                            <ReferenceField label="Trainer" source="userId" reference="users" link={false} sortBy="name">
                                <TextField source="name" />
                            </ReferenceField>
                            <TextField source="community"  label="Community"/>
                            <TextField source="groupType" label="Group Type"/>
                            <NumberField source="groupSizeNum" label="Group Size"/>
                            <DateField source="started" label="Started"/>
                            <DateField source="completed" label="Completed"/>
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </CustomEdit>
    );
}

export default OrganizationEdit;