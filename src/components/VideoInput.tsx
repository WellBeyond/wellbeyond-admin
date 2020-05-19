import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useInput} from 'ra-core';
import {Labeled} from 'react-admin';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {cloudinary, ICloudinaryUploadResult, ICloudinaryWidget} from "../lib/cloudinary";
import {cloudinaryConfig} from "../CLOUDINARY_CONFIG";
import VideoPlayer from "./VideoPlayer";

type MyProps = {
    record?: {[index: string]:any},
    source: string,
    label?: string,
    isRequired?: boolean
}

const useStyles = makeStyles(theme => ({
    hidden: {
        display: 'none'
    },
    root: {
        flexGrow: 100,
        marginTop: 10,
        marginBottom: 10,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto'
    },
    grow: {
        flexGrow: 100
    },
    half: {
        width: '50%',
        align: 'top'
    },
    video: {
        display: 'block',
        maxWidth: 400,
        maxHeight: 300,
    }
}));

export const VideoInput: React.FunctionComponent<MyProps> = ({record, source, label, isRequired, ...rest}) => {
    const classes = useStyles();
    const {
        input: { value, onChange },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        meta: { touched, error },
    } = useInput({ source, ...rest });

    const handleUploadResult = useCallback((uploadResult: ICloudinaryUploadResult) =>{
        console.log("uploadResult", uploadResult);
        onChange(uploadResult.secure_url);
    },[onChange]);

    const createWidget = useCallback(() => {
        let options = {
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.videoUploadPreset,
            showPoweredBy: false,
            sources: ['local', 'url', 'camera'],
            defaultSource: 'local',
            showCompleteButton: false,
            showUploadMoreButton: false,
            multiple: false,
            singleUploadAutoClose: false,
            showAdvancedOptions: false,
            cropping: false

        };
        return cloudinary.createUploadWidget(options, function (err: object, result: any) {
            if (err) {
                return console.log(err);
            }
            console.log(result);
            if (result && result.event === 'success' && result.info) {
                handleUploadResult(result.info);
            }
        });
    }, [handleUploadResult]);

    const [widget, setWidget] = useState<ICloudinaryWidget|null>();
    useEffect(() => {
        const widget = createWidget();
        setWidget(widget);
    }, [createWidget]);

    const handleClick = () => {
        widget && widget.open();
    };
    const handleDelete = () => {
        onChange('');
    };

    return (
        <Fragment>
            <div className={classes.root}>
                <Labeled
                    label={label}
                    source={source}
                    isRequired={isRequired}
                />
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item className={classes.half}>
                            {value ?
                                <div className={classes.video}>
                                    <VideoPlayer id={'video-' + Date.now()} src={value} />
                                </div> :
                                undefined
                            }
                        </Grid>
                        <Grid item className={classes.half}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={handleClick}>{(value ? 'Change ' : 'Upload ') + (label || 'Video')}</Button>
                                </Grid>
                                {value ?
                                    <Grid item>
                                        <Button variant="contained"
                                                onClick={handleDelete}>Remove {label || 'Video'}</Button>
                                    </Grid>
                                    : undefined
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </Fragment>
    );
};
