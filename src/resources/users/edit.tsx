import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {BooleanInput, FormTab, TabbedForm, TextInput} from "react-admin";
import CustomEdit from '../../components/CustomEdit';
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}

const UserEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />} warnWhenUnsavedChanges>
            <FormTab label="Summary">
                <TextInput source="name" label="Name" fullWidth={true}/>
                <TextInput type="email" source="email" label="Email Address" fullWidth={true}/>
                <TextInput source="organization" label="Organization" fullWidth={true}/>
                <BooleanInput source="acceptedTerms" label="Accepted Terms?" fullWidth={true}/>
            </FormTab>

        </TabbedForm>
    </CustomEdit>
);

export default UserEdit;