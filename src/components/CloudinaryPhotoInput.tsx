import React, {useCallback, useState} from 'react';
import {useInput} from 'ra-core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import {makeStyles} from '@material-ui/core/styles';
import {cloudinary, ICloudinaryUploadResult, ICloudinaryWidget} from "../lib/cloudinary";
import {cloudinaryConfig} from "../CLOUDINARY_CONFIG";
import get from 'lodash.get';
import {NumberInput, TextInput} from "react-admin";

type MyProps = {
    record?: {[index: string]:any},
    source: string
    id?: string
    inline?: boolean
}

const useStyles = makeStyles(theme => ({
    hidden: {
        display: 'none'
    },
    root: {
        flexGrow: 100,
        marginTop: 10
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto'
    },
    grow: {
        flexGrow: 100
    },
    image: {
        width: 400,
        align: 'top'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    }
}));

export const CloudinaryPhotoInput: React.FunctionComponent<MyProps> = ({record, source, id, inline, ...rest}) => {
    const classes = useStyles();
    const {
        input: { onChange },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        meta: { touched, error },
    } = useInput({ source, ...rest });

    const setUploadResult = useCallback((uploadResult: ICloudinaryUploadResult) =>{
        console.log("uploadResult", uploadResult);
        setUpload(uploadResult);
        onChange(uploadResult);
    },[onChange]);

    const createWidget = useCallback(() => {
        let options ={
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.photoUploadPreset,
            showPoweredBy: false,
            sources: ['local', 'url', 'camera'],
            defaultSource: 'local',
            showCompleteButton: false,
            showUploadMoreButton: false,
            multiple: true,
            singleUploadAutoClose: true,
            showAdvancedOptions: false,
            cropping: true,
            inlineContainer: inline ? ('#'+id+'-upload-widget') : undefined

        };
        return cloudinary.createUploadWidget(options, function(err: object, result: any) {
            if (err) {
                return console.log(err);
            }
            if (result && result.event === 'success' && result.info) {
                setUploadResult(result.info);
            }
        });
    },[id, inline, setUploadResult]);

    const [upload, setUpload] = React.useState(get(record, source));
    const [widget, setWidget] = useState<ICloudinaryWidget|null>();
    React.useEffect(() => {
        let widget = createWidget();
        setWidget(widget);
        if (inline) {
            widget.open();
        }
    }, [createWidget, inline]);

    const handleClick = () => {
        widget && widget.open();
    };

    if (inline && !upload) {
        return (
            <div className={inline ? undefined: 'hidden'}>
                <div id={id + '-upload-widget'}></div>
            </div>
        );
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase onClick={handleClick} title="Click to update the image">
                            <div className={classes.image}>
                                <img className={classes.img} alt="Uploaded file" src={upload.secure_url}/>
                            </div>
                        </ButtonBase>
                    </Grid>
                    <Grid item className={classes.grow}>
                        <TextInput record={record}  source="data.secure_url" disabled={true} fullWidth={true} label='Fullsize URL' />
                        <TextInput record={record}  source="data.thumbnail_url" disabled={true} fullWidth={true} label='Thumbnail URL' />

                        <Grid container spacing={2}>
                            <Grid item>
                                <NumberInput record={record}  source="data.bytes" disabled={true} label="Bytes"/>
                            </Grid>
                            <Grid item>
                                <NumberInput record={record}  source="data.height" disabled={true} label="Height"/>
                            </Grid>
                            <Grid item>
                                <NumberInput record={record}  source="data.width" disabled={true} label="Width"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};
