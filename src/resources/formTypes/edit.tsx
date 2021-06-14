import * as React from "react";

import {FormTab, required, TabbedForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomEdit from "../../components/CustomEdit";
import CustomEditToolbar from "../../components/CustomEditToolbar";
import { PhotoInput } from "../../components/PhotoInput";

interface FormDataConsumerProps {
    formData: any;
}

const FormTypeEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
                <RichTextInput source="description" fullWidth={true}/>
                <PhotoInput source='photo' label="Icon" />
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default FormTypeEdit;