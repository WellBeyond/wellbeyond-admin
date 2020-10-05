import * as React from "react";
import {useEffect, useState} from "react";

import {AutocompleteInput, Create, SimpleForm, useDataProvider} from "react-admin";

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
            <SimpleForm>
                <AutocompleteInput source="id" choices={userList} optionText={optionRenderer} fullWidth={true} limitChoicesToValue={true} translateChoice={false} allowEmpty={false} label="Begin typing the name of an existing user"/>
            </SimpleForm>
        </Create>
    );
}
export default AdminCreate;