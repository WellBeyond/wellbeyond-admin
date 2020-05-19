import React, {FunctionComponent} from 'react';
import {Video} from 'cloudinary-react';
import get from 'lodash.get';
import {FieldProps, fieldPropTypes, InjectedFieldProps} from './types';
import {cloudinaryConfig} from "../CLOUDINARY_CONFIG";

export const CloudinaryVideoField: FunctionComponent<FieldProps & InjectedFieldProps> = ({
                                                              record,
                                                              source,
                                                              className,
                                                              ...rest
                                                          }) => {
    const data = get(record, source);
    return (
            <Video
                cloudName={cloudinaryConfig.cloudName}
                publicId={data.public_id}
                controls={true}
            />
    );
};

// wat? TypeScript looses the displayName if we don't set it explicitly
CloudinaryVideoField.displayName = 'CloudinaryVideoField';

CloudinaryVideoField.propTypes = {
    ...fieldPropTypes
};
