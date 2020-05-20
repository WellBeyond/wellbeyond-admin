import React, {useEffect, useState, useCallback} from 'react';
import {useGetOne, Loading} from 'react-admin';
import {ArrayField, Datagrid, DateField, FormTab, NumberField, ReferenceField, TextField} from "react-admin";

type MyProps = {
    record?: {[index: string]:any},
    source: string,
    fullWidth?: boolean,
}

export const TrainingLessons: React.FunctionComponent<MyProps> = ({record, source, ...rest}) => {
    const getLessons = useCallback((subject:any) => {
        let lessons:any[] = [];
        if (record && source && record[source]) {
            if (subject.lessons && Array.isArray(subject.lessons)) {
                subject.lessons.forEach((l:any)=> {
                    if (l.lessonId && record[source][l.lessonId]) {
                        lessons.push(record[source][l.lessonId]);
                    }
                });
            }
        }
        return {lessons: lessons};
    }, [record, source]);
    const { data, loading, error } = useGetOne('subjects', record && record.subjectId);
    if (loading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }

    return (
        <ArrayField  {...rest} record={getLessons(data)} source="lessons" fullWidth={true} label={false}>
            <Datagrid>
                <ReferenceField label="Lesson" source="lessonId" reference="lessons" >
                    <TextField source="name" />
                </ReferenceField>
                <DateField showTime={true} source="started"/>
                <DateField showTime={true} source="completed"/>
                <NumberField source="score"/>
            </Datagrid>
        </ArrayField>
    );
};
