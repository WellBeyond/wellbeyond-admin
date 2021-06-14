import React, {Fragment, useEffect, useState} from 'react';
import {Loading, required, SelectInput, useDataProvider} from 'react-admin';
import {useFormState} from 'react-final-form';
import {Organization} from "../types";

type MyProps = {
    isRequired?: boolean
    fullWidth?: boolean
}


const OrganizationCommunityInput:React.FunctionComponent<MyProps> = ({isRequired, ...rest}) => {

    const [organizationList, setOrganizationList] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);

    const toOrgChoices = (items:Organization[]) => items.map(item => ({ id: item.id, name: item.name }));
    const toCommunityChoices = (orgId:string) => {
        if (!orgId || !organizationList || !organizationList.length) {
            return [];
        }
        const organization = organizationList.find((org) => org.id === orgId);
        if (!organization || !organization.communities || !organization.communities.length) {
            return [];
        }
        return organization.communities.sort((a: any, b: any) => {
            return a.name < b.name ? -1 : +1;
        }).map(item => ({ id: item.name, name: item.name }));
    }

    const { values } = useFormState();
    const dataProvider = useDataProvider();
    useEffect(() => {
        // @ts-ignore
        dataProvider.getList('organizations', {
            filter: { },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 1000 },
            // @ts-ignore
        }).then(({ data }) => {
            setLoading(false);
            setOrganizationList(data);
        })
            // @ts-ignore
            .catch(error => {
                setLoading(false);
            })
    }, [dataProvider]);

    if (loading) { return <Loading />; }

    return (
        <Fragment>
            <div className="ra-input">
                <SelectInput label="Organization" source="organizationId" fullWidth={true} allowEmpty={false} validate={required('Please select an organization')}
                             choices={organizationList ? toOrgChoices(organizationList) : []}
                             {...rest}
                />
            </div>
            <div className="ra-input">
                <SelectInput label="Community" source="community"
                             fullWidth={true} allowEmpty={!isRequired} validate={isRequired ? required('Please select a community') : undefined}
                             choices={values && values.organizationId ? toCommunityChoices(values.organizationId) : []}
                             {...rest}
                />
            </div>
        </Fragment>
    );
}

export default OrganizationCommunityInput;