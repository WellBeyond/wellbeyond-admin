import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput, Tab, SelectInput, FormTab
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const SolutionCreate = (props: object) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="name" fullWidth={true} />
            <BooleanInput source="askAreYouAble" label="Ask if the user is able to perform the fix first" fullWidth={true}/>
            <BooleanInput source="askFoPhotoBefore" label="Ask for a before photo" fullWidth={true}/>
            <BooleanInput source="askFoPhotoAfter" label="Ask for an after photo" fullWidth={true}/>
        </SimpleForm>
    </Create>
);

export default SolutionCreate;