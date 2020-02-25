import React from 'react';
import {useInput } from 'ra-core';
import Button from '@material-ui/core/Button';
import { cloudinary, ICloudinaryUploadResult, ICloudinaryWidget } from "../lib/cloudinary";
import get from 'lodash.get';

type MyProps = {
    record?: {[index: string]:any},
    source: string,
    cloudName: string,
    uploadPreset: string,
    onFileUpload?: any
}

export const CloudinaryUploadButton: React.FunctionComponent<MyProps> = ({record, cloudName, uploadPreset, onFileUpload, source, ...rest}) => {

    const {
        input: { value, onChange },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        meta: { touched, error },
    } = useInput({ source, ...rest });

    const [upload, setUpload] = React.useState(get(record, source));

    const setUploadResult = (uploadResult: ICloudinaryUploadResult) =>{
        console.log("uploadResult", uploadResult);
        setUpload(uploadResult);
        onChange(uploadResult);
        if (onFileUpload) {
            onFileUpload(uploadResult);
        }
    };

    const createWidget = () => {
        let options ={
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            showPoweredBy: false,
            sources: ['local', 'url', 'camera'],
            defaultSource: 'local'
        };
        return cloudinary.createUploadWidget(options, function(err: object, result: any) {
            if (err) {
                return console.log(err);
            }
            if (result && result.event === 'success' && result.info) {
                setUploadResult(result.info);
            }
        });
    };

    const handleClick = () => {
        widget.open();
    };

    let widget: ICloudinaryWidget = createWidget();
    return (
        <Button variant="contained" onClick={handleClick}>Upload Photo</Button>
    );
};
