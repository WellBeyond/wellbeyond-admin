import React, { FunctionComponent } from 'react';
import {Photo} from 'cloudinary-react';
import get from 'lodash.get';
import { FieldProps, InjectedFieldProps, fieldPropTypes } from './types';
import { cloudinaryConfig } from "../CLOUDINARY_CONFIG";

export const CloudinaryPhotoField: FunctionComponent<FieldProps & InjectedFieldProps> = ({
                                                              record,
                                                              source,
                                                              className,
                                                              ...rest
                                                          }) => {
    const data = get(record, source);
    return (
            <Photo
                cloudName={cloudinaryConfig.cloudName}
                publicId={data.public_id}
            />
    );
};

// wat? TypeScript looses the displayName if we don't set it explicitly
CloudinaryPhotoField.displayName = 'CloudinaryPhotoField';

CloudinaryPhotoField.propTypes = {
    ...fieldPropTypes
};
