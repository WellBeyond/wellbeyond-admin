import * as React from "react";

import {FormTab, required, TabbedForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomEdit from "../../components/CustomEdit";
import CustomEditToolbar from "../../components/CustomEditToolbar";

interface FormDataConsumerProps {
    formData: any;
}

const FormTypeEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default FormTypeEdit;