import React, {useCallback} from 'react';
import {ArrayField, Datagrid, Loading, ReferenceField, TextField, useGetOne} from 'react-admin';
import forms from '../resources/forms';

type MyProps = {
    record?: {[index: string]:any},
    source: string,
    // forms: {[]: any},
    fullWidth?: boolean,
}

export const Forms: React.FunctionComponent<MyProps> = ({record, source, ...rest}) => {
    const getforms = useCallback((formTypes:any) => {
        let forms:any[] = [];
        let formAnswers: any;
        let answerObject: any = {}
        if (record && source && record[source]) {
            answerObject = record[source]
            let currentFormId = record.formId
            formAnswers = record.forms

            console.log("============>", {currentFormId, formAnswers, source, record, answerObject})

            if (formAnswers && formAnswers[currentFormId]) {
                //  return <p>We did get here</p>; 
                console.log('========= got here', formAnswers[currentFormId].answers)
                // formAnswers[currentFormId].answers.forEach((r:any)=> {
                //     if (r.formId && record[source][r.formId]) {
                //         forms.push(record[source][r.formId]);
                //     }
                // });
            }
        }
        return {forms: forms};
    }, [record, source]);
    const { data, loading, error } = useGetOne('formTypes', record && record.formTypeId);
    if (loading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }

    return (
        <ArrayField  {...rest} record={getforms(data)} source="forms" fullWidth={true} label={false}>
            <Datagrid>
                <ReferenceField label="Form" source="formId" reference="forms" >
                    <TextField source="name" />
                </ReferenceField>

            </Datagrid>
        </ArrayField>
    );
};
