import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {Create, SelectInput, SimpleForm, TextInput} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import {PhotoInput} from "../../components/PhotoInput";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

type MyProps = {
    location?: {[index: string]:any},
    toolbar?: object
}

const sessionDefaultValue = { pages: [] };
const SessionCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar />} initialValues={sessionDefaultValue}>
                <TextInput source="name" fullWidth={true}/>
                <SelectInput source="locale" label="Language" fullWidth={true} choices={[
                    {id: 'en', name: 'English'},
                    {id: 'sw', name: 'Swahili'}
                ]}/>
                <RichTextInput source="description" fullWidth={true}/>
                <PhotoInput source='photo' label="Photo" />
            </SimpleForm>
        </Create>
    );
};

export default SessionCreate;
