import * as React from "react";

import {FormTab, required, TabbedForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import CustomEdit from "../../components/CustomEdit";
import CustomEditToolbar from "../../components/CustomEditToolbar";
import { PhotoInput } from "../../components/PhotoInput";
import { SelectInput } from "react-admin";

interface FormDataConsumerProps {
    formData: any;
}

const FormTypeEdit = (props: any) => (
    <CustomEdit {...props}>
        <TabbedForm toolbar={<CustomEditToolbar />}>
            <FormTab label="Summary">
                <TextInput source="name" fullWidth={true} validate={required('Name is required')}/>
                <RichTextInput source="description" fullWidth={true}/>
                <SelectInput
                    source="formCategory"
                    label="Form Category"
                    fullWidth={true}
                    allowEmpty={false}
                    choices={[
                    { id: "water-systems", name: "Water Systems" },
                    { id: "impact-reporting", name: "Impact Reporting" },
                    { id: "misc-reporting", name: "Misc Reporting" },
                    ]}
                />
                <PhotoInput source='photo' label="Icon" />
            </FormTab>
        </TabbedForm>
    </CustomEdit>
);

export default FormTypeEdit;