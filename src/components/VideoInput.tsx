import React, {useState, useEffect, Fragment} from 'react';
import {useInput, FieldTitle } from 'ra-core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import { cloudinary, ICloudinaryUploadResult } from "../lib/cloudinary";
import { cloudinaryConfig } from "../CLOUDINARY_CONFIG";
import get from 'lodash.get';
import {Video} from "cloudinary-react";

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
        marginTop: 20
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
        maxWidth: '100%',
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

    const handleUploadResult = (uploadResult: ICloudinaryUploadResult) =>{
        console.log("uploadResult", uploadResult);
        setUrl(uploadResult.secure_url);
        onChange(uploadResult.secure_url);
    };

    const createWidget = () => {
        let options ={
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
        return cloudinary.createUploadWidget(options, function(err: object, result: any) {
            if (err) {
                return console.log(err);
            }
            console.log(result);
            if (result && result.event === 'success' && result.info) {
                handleUploadResult(result.info);
            }
        });
    };

    const [url, setUrl] = useState(get(record, source));
    const [widget, setWidget] = useState();
    useEffect(() => {
        let widget = createWidget();
        setWidget(widget);
    }, []);

    const handleClick = () => {
        widget.open();
    };

    return (
        <Fragment>
            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginDense MuiFormControl-fullWidth">
                {label !== '' && (
                    <label
                        className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense"
                        data-shrink="true">
                        <FieldTitle
                            label={label}
                            source={source}
                            isRequired={isRequired}
                        />
                    </label>)
                }
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item className={classes.half}>
                                {value ?
                                    <div className={classes.video}>
                                        <Video className={classes.video}
                                               cloudName={cloudinaryConfig.cloudName}
                                               publicId={value}
                                               controls={true}
                                        />
                                    </div> :
                                    undefined
                                }
                            </Grid>
                            <Grid item className={classes.half}>
                                <Button variant="contained" onClick={handleClick}>{value ? 'Change Video' : 'Upload Video'}</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        </Fragment>
    );
};
