import {ICloudinaryUploadResult} from "../../lib/cloudinary";

export interface IPhoto {
    name: string,
    description: string,
    data: ICloudinaryUploadResult,
    symptomId?: string,
    questionId?: string,
    solutionId?: string,
    createdate: Date,
    lastupdate: Date,
    createdby: string,
    updatedby: string
}

export const validatePhoto = (values:IPhoto) => {
    const errors:any = {};
    if (!values.name) {
        errors.name = ['A title is required'];
    }
    if (!values.data) {
        errors.data = ['You must upload or select a photo file'];
    }
    return errors
};