import {ICloudinaryUploadResult} from "../../lib/cloudinary";

export interface IVideo {
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

export const validateVideo = (values:IVideo) => {
    const errors:any = {};
    if (!values.name) {
        errors.name = ['A title is required'];
    }
    if (!values.data) {
        errors.data = ['You must upload or select a videl file'];
    }
    return errors
};