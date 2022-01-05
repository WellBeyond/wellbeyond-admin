import * as React from "react";
import {useEffect, useState} from "react";

import {AutocompleteInput, SelectArrayInput, required, Create, SimpleForm, useDataProvider} from "react-admin";
import CustomCreateToolbar from "../../components/CustomCreateToolbar";

interface FormDataConsumerProps {
    formData: any;
}

const AdminCreate = (props: object) => {

    const [userList, setUserList] = useState([]);
    
    const dataProvider = useDataProvider();
    useEffect(() => {
        dataProvider.getList('users', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10000 },
        })
            // @ts-ignore
            .then(({ data }) => {
            setUserList(data || []);
        })
            // @ts-ignore
            .catch(error => {
        });
    }, [dataProvider]);

    const optionRenderer = (choice:any) => `${choice.name} - ${choice.email}`;
    
    return (
       <Create {...props} >
            <SimpleForm toolbar={<CustomCreateToolbar />}>
                <AutocompleteInput source="id" choices={userList} optionText={optionRenderer} fullWidth={true} limitChoicesToValue={true} translateChoice={false} allowEmpty={false} label="Begin typing the name of an existing user"/>
                <SelectArrayInput
                    source="permittedResources"
                    label="Permitted Resources"
                    fullWidth={true}
                    allowEmpty={false}
                    validate={required('Please select one or more system type(s)')}
                    choices={[
                    { id: "diagnostic-logs", name: "Diagnostic Logs" },
                    { id: "maintenance-logs", name: "Maintenance Logs" },
                    { id: "training-sessions", name: "Training Sessions"},
                    { id: "form-sessions", name: "For Sessions"}
                    ]}
                />
            </SimpleForm>
        </Create>
    );
}
export default AdminCreate;