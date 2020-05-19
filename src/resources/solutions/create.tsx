import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {BooleanInput, Create, SimpleForm, TextInput} from "react-admin";

type MyProps = {
    location?: {[index: string]:any},
    toolbar?: object
}

const SolutionCreate = (props: MyProps) => {
    const {toolbar} = props;

    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar}>
                <TextInput source="name" fullWidth={true}/>
                <BooleanInput source="askAreYouAble" label="Ask if the user is able to perform the fix first"
                              fullWidth={true}/>
                <BooleanInput source="askForPhotoBefore" label="Ask for a before photo" fullWidth={true}/>
                <BooleanInput source="askForPhotoAfter" label="Ask for an after photo" fullWidth={true}/>
            </SimpleForm>
        </Create>
    );
};

export default SolutionCreate;