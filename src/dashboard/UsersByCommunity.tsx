import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Theme} from '@material-ui/core';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {useTranslate} from 'react-admin';
import {Organization, User} from "../types";
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Identifier} from "ra-core";
import './DashboardCard.scss';

interface CommunityCounts {
    name: string;
    total: number;
}

interface OrganizationCounts {
    name: string;
    organization: Organization;
    total: number;
    communities: CommunityCounts[]
}
const COLORS = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
    '#cea200',
    '#9f9a00',
    '#738f00',
    '#488214',
];

const useStyles = makeStyles((theme:Theme) => ({
    cardContent: {
        height: '20em'
    },
    formControl: {
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));


const UsersByCommunity: FC<{ users?: User[], organizations?: Organization[] }> = ({ users, organizations }) => {
    const translate = useTranslate();
    const classes = useStyles();
    const [data, setData] = useState<any>();
    const [organization, setOrganization] = useState<Organization>();
    const [counts, setCounts] = useState<OrganizationCounts[]>([]);

    const showOrganization = (orgId:Identifier, counts:OrganizationCounts[]) => {
        if (counts) {
            const data: { name: string; value: number; }[] = [];
            const count = counts.find(c => c.organization && c.organization.id === orgId);
            if (count && count.communities) {
                count.communities.forEach((cc) => {
                    if (cc.total) {
                        data.push({name: cc.name, value: cc.total});
                    }
                });
                data.sort((a, b) => {
                    if (a.value === b.value) {
                        return a.name < b.name ? -1 : 1;
                    }
                    return a.value > b.value ? -1 : 1;
                });

                setData(data.slice(0, COLORS.length));
                setOrganization(count.organization);
            }
        }
    };

    const showAllOrganizations = (counts:OrganizationCounts[]) => {
        if (counts) {
            const data: { name: string; value: number; }[] = [];
            counts.forEach((count) => {
                if (count.total) {
                    data.push({name: count.name, value: count.total});
                }
            });
            data.sort((a, b) => {
                if (a.value === b.value) {
                    return a.name < b.name ? -1 : 1;
                }
                return a.value > b.value ? -1 : 1;
            });
            setData(data.slice(0, COLORS.length));
            setOrganization(undefined);
        }
    };

    const handleChange = (event:any) => {
        if (counts) {
            if (event.target.value) {
                showOrganization(event.target.value, counts);
            }
            else {
                showAllOrganizations(counts);
            }
        }
    }

    useEffect(() => {
        if (!users || !organizations || !organizations.length) return;

        const orgMap = new Map<Identifier, any>();
        const counts = [] as OrganizationCounts[];

        organizations.forEach((org:Organization) => {
            orgMap.set(org.id, {name: org.name, organization: org, total: 0, communities: {}});
            orgMap.set('None', {name: 'None', organization: {id: 'None'}, total: 0, communities: {}});
        });
        users.forEach((user:User) => {
            const orgId = (user.organizationId  && orgMap.has(user.organizationId)) ? user.organizationId : 'None';
            const comm = user.community || 'None';
            const orgInfo = orgMap.get(orgId);
            orgInfo.total++;
            if (!orgInfo.communities[comm]) {
                orgInfo.communities[comm] = {name: comm, total: 0}
            }
            orgInfo.communities[comm].total++;
        });

        orgMap.forEach((orgInfo:any) => {
            if (orgInfo.total) {
                const count: OrganizationCounts = {
                    name: orgInfo.name,
                    organization: orgInfo.organization,
                    total: orgInfo.total,
                    communities: []
                };
                for (const c in orgInfo.communities) {
                    count.communities.push({name: orgInfo.communities[c].name, total: orgInfo.communities[c].total});
                }
                counts.push(count);
            }
        });
        setCounts(counts);

        if (organizations.length === 1) {
            showOrganization(organizations[0].id, counts);
        }
        else {
            showAllOrganizations(counts);
        }
    }, [users, organizations]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!data) return null;

    return (
        <Card>
            <h1 className='pieChartTitle' >{translate('Users by Organization/Community')}</h1>
            <CardContent>
                <div className={classes.cardContent}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="ubc-org-select-label">Organization</InputLabel>
                        <Select
                            labelId="ubc-org-select-label"
                            id="ubc-org-select"
                            value={organization ? organization.id : undefined}
                            onChange={handleChange}
                        >
                            {organizations && organizations.length > 1 && <MenuItem value="">
                                <em>Show all organizations</em>
                            </MenuItem>}
                            {counts && counts.sort((a,b) => a.name < b.name ? -1 : 1).map((entry:any, index:number) => <MenuItem value={entry.organization ? entry.organization.id : 'None'}>{entry.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <ResponsiveContainer>
                        <PieChart width={800} height={800}>
                            <Pie dataKey="value" cy={'90%'} outerRadius={'150%'} startAngle={180} endAngle={0} data={data} label >
                                {
                                    data.map((entry:any, index:number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={120}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default UsersByCommunity;