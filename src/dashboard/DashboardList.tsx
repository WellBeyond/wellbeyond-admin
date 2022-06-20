import React from 'react';
import {Datagrid, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField} from "react-admin";


interface DashboardListProps {
    diagnosticFilter: any;
}

const DashboardList: React.FC<DashboardListProps> = ({ diagnosticFilter}, probObject:object) => {
    return (
        <div>
            <div className='cardPadding'>
                {/* Dashboard List */}
                <List {...probObject}
                    perPage={25}
                    filters={diagnosticFilter}
                    sort={{field: 'name', order: 'ASC'}}>
                    <Datagrid optimized rowClick="edit">
                        <TextField source="name" label="Question Text"/>
                        <ReferenceField
                            label="Problem"
                            source={'symptomId'}
                            sortable={false}
                            reference="symptoms">
                            <TextField source="name"/>
                        </ReferenceField>
                    </Datagrid>
                </List>
            </div>
        </div>
    );
}

export default DashboardList;