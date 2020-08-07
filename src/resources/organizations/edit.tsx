import React from "react";
import {
    ArrayInput,
    Datagrid, DateField,
    FormTab, NumberField, ReferenceField,
    ReferenceManyField,
    SimpleFormIterator,
    TabbedForm,
    TextField,
    TextInput
} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}
const OrganizationEdit = (props: any) => {
    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} >
                <FormTab label="Summary">
                    <TextInput source="name" fullWidth={true}/>
                </FormTab>
                <FormTab label="Communities">
                    <ArrayInput source="communities" label="">
                        <SimpleFormIterator>
                            <TextInput source="name" label="Community Name"/>
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