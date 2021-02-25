import React from "react";
import {SelectInput} from "react-admin";
import {useForm} from 'react-final-form';

export const choices = [
    { _id: 'isAdmin', name: 'System Administrator' },
    { _id: 'isClientAdmin', name: 'Client Administrator'},
    { _id: 'isMaintenanceUser', name: 'Maintenance User'},
 ];

 export const onSelectChoice = (choice: string, form: any) => {
     choices.map(option => {
         form.change(option._id, option._id === choice)
         if(choice === 'isAdmin') form.change('organizations',[])
     })
 }

export const AdminType = (props:any) => {
    const form = useForm();

    return (
            <SelectInput source="AdminType"
                         allowEmpty={false}
                         choices={choices}
                         fullWidth={true}
                         label="Admin Type"
                         optionValue="_id"
                         onChange={(event: any) =>
                            onSelectChoice(event.target.value, form)}
                          {...props} />
    );
};
export default AdminType;