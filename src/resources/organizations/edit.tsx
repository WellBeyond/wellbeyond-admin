import React, {useState} from "react";
import {
    ArrayInput,
    Datagrid,
    FormTab,
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


    const [lessons, setLessons] = useState<any>();

    // @ts-ignore
    const WithProps = ({children,...props}) => {
        setLessons({lessons: []})
        return children(props);
    }

    return (
        <CustomEdit {...props}>
            <TabbedForm toolbar={<CustomEditToolbar />} warnWhenUnsavedChanges>
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
            </TabbedForm>
        </CustomEdit>
    );
}

export default OrganizationEdit;