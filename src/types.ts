import {Identifier, Record, ReduxState} from 'ra-core';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface LessonPage {
    title: string,
    text: string,
    photo?: string,
    video?: string,
    photoCaption?: string,
    videoCaption?: string,
    attestation?: string
}

export interface Question {
    questionType: string;
    questionText: string;
    choices?: Array<{value: string}>;
    correctAnswer: string|number;
    explanation?: string;
}

export enum FormQuestionType {
    Text = "text",
    Radio = "radio",
    Checkbox = "checkbox",
    Photo = "photo",
    Video = "video"
}

export interface FormQuestion {
    questionType: FormQuestionType;
    questionText: string;
    isRequired: boolean;
    choices?: Array<{value: string}>;
    helpText: string;
}

export interface Form extends Record {
    organizationId?: Identifier;
    locale?: string;
    type: string;
    name: string;
    description: string;
    isPublished: boolean;
    questions: FormQuestion[];
}

export interface Answer {
    question: string;
    answerBefore?: string | number;
    answerAfter?: string | number;
    correctAnswer?: string | number;
}

export interface Community {
    name: string;
    intercomCompany?: string;
}

export interface GroupType {
    name: string;
}

export interface PageView {
    attestationChecked?: boolean;
    videoWatched?: boolean;
}

export interface LessonProgress {
    id: Identifier;
    lessonId: Identifier;
    started?: Date;
    completed?: Date;
    preScore?: number;
    score?: number;
    answers: Array<Answer>;
    pageViews: Array<PageView>;
}

export interface LessonProgressHash {
    [lessonId:string] : LessonProgress
}

export interface User extends Record {
    name: string;
    email?: string;
    phoneNumber?: string;
    photoURL?: string;
    organizationId?: Identifier;
    organization?: string; // If not from the predefined list
    community?: string;
    acceptedTerms?: boolean;
    canTeach?: boolean;
    notificationsOn?: boolean;
    intercomCompany?: object;
    intercomTag?: object;
}

export interface Admin extends Record {
    isAdmin?: boolean;
    isClientAdmin?: boolean;
    isMaintenanceUser?: boolean;
    organizations?: string[];
}

export interface Organization extends Record {
    name: string;
    password?: string;
    contactName?: string;
    contactEmail?: string;
    communities: Community[];
    intercomCompany?: string;
    intercomTag?: string;
}

export interface Lesson extends Record {
    organizationId?: Identifier;
    locale?: string;
    name: string;
    description: string;
    photo: string;
    pages: LessonPage[]; // Embedded list
    questions: Question[]; // Embedded list
}

export interface Topic extends Record {
    name: string;
    description: string;
    photo: string;
}

export interface Subject extends Record {
    topicId?: Identifier;
    organizationId?: Identifier;
    locale?: string;
    name: string;
    description: string;
    photo: string;
    lessons: Array<{lessonId: string}>; // Ordered list of lesson ids
    groupTypes?: GroupType[];
}

export interface TrainingSession extends Record {
    name?: string;
    archived: boolean;
    userId: Identifier;
    organizationId?: Identifier;
    organization?: string;
    community?: string;
    subjectId: Identifier;
    groupType?: string;
    groupSize?: string;
    groupSizeNum?: number;
    started?: Date;
    completed?: Date;
    lessons?: LessonProgressHash;
}

/**
 * Types to eventually add in react-admin
 */
export interface FieldProps<T extends Record = Record> {
    addLabel?: boolean;
    label?: string;
    record?: T;
    source?: string;
}
