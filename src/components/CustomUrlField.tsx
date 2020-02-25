import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});

type CustomUrlProps = {
    record: {[index: string]:any},
    source: string
}

const CustomUrlField: React.FunctionComponent<CustomUrlProps> = ({record, source}) => {
    const classes = useStyles();
    const url: string = record[source] as string;
    return (
        <a href={url} className={classes.link}>
            {url}
            <LaunchIcon className={classes.icon} />
        </a>
    );
};

export default CustomUrlField;