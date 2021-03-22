import * as React from "react";

import {Create, DateTimeInput, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";
import { PhotoInput } from "../../components/PhotoInput";

type MyProps = {
    location?: {[index: string]:any},
    toolbar?: object
}

const maintenanceLogDefaultValue = { locale: 'en', steps: [] };
const MaintenanceLogCreate = (props: MyProps) => {
    const {toolbar} = props;
    return (
        <Create {...props} >
            <SimpleForm toolbar={toolbar || <CustomCreateToolbar />} initialValues={maintenanceLogDefaultValue}>
                <TextInput source="name" fullWidth={true}/>
                <ReferenceInput label="Organization" source="organizationId" reference="organizations" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="System" source="systemId" reference="systems" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="Performed By" source="userId" reference="users" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <ReferenceInput label="Checklist" source="checklistId" reference="checklists" fullWidth={true} allowEmpty={false}>
                    <SelectInput optionText="name" fullWidth={true} allowEmpty={false} />
                </ReferenceInput>
                <DateTimeInput source="started" fullWidth={true}/>
                <DateTimeInput source="completed" fullWidth={true}/>
                <PhotoInput source='photo' label="Photo" />
            </SimpleForm>
        </Create>
    );
};

export default MaintenanceLogCreate;
