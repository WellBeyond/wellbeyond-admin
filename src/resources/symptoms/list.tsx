import * as React from "react";

import {ArrayField, ChipField, Datagrid, List, ReferenceField, SingleFieldList, TextField} from "react-admin";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    nameColumn: {
        display: 'inline-block',
        minWidth: 300,
    }
});


const SymptomList = (props: object) => {
    const classes = useStyles();
    return (
        <List {...props}
              perPage={25}
              sort={{field: 'name', order: 'ASC'}}>
            <Datagrid optimized rowClick="edit">
                <TextField source="name" label="Problem" className={classes.nameColumn}/>
                <ArrayField label="Potential Solutions" source="rules">
                    <SingleFieldList>
                        <ReferenceField
                            source={'solutionId'}
                            basePath={'/solutions'}
                            reference="solutions"
                        >
                            <ChipField source="name"/>
                        </ReferenceField>
                    </SingleFieldList>
                </ArrayField>
                <ArrayField label="Potential Root Causes" source="rootCauses">
                    <SingleFieldList>
                        <ReferenceField
                            source={'symptomId'}
                            basePath={'/symptoms'}
                            reference="symptoms"
                        >
                            <ChipField source="name"/>
                        </ReferenceField>
                    </SingleFieldList>
                </ArrayField>
            </Datagrid>
        </List>
    );
}

export default SymptomList;