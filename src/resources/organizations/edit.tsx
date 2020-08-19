import React, {useEffect, useState} from 'react';
import {
    ArrayInput,
    Datagrid,
    DateField,
    FormTab,
    NumberField,
    ReferenceField,
    ReferenceManyField,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";
import * as firebase from "firebase/app";
import 'firebase/functions';

interface FormDataConsumerProps {
    formData: any;
}

const OrganizationEdit = (props: any) => {

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
                </FormTab>
                <FormTab label="Communities">
                    <ArrayInput source="communities" label="">
                        <SimpleFormIterator>
                            <TextInput source="name" label="Community Name" fullWidth={true} />
                            <SelectInput source="intercomCompany" fullWidth={true} label="Intercom Company" choices={companies} allowEmpty={true}/>
                        </SimpleFormIterator>
                    </ArrayInput>
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
                            <TextField source="name" />
                            <TextField source="email" />
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