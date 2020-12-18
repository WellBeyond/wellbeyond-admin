import * as React from "react";

import {Edit, FormTab, TabbedForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";

interface FormDataConsumerProps {
    formData: any;
}

const SystemTypeEdit = (props: any) => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true}/>
                <RichTextInput source="description" fullWidth={true}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default SystemTypeEdit;