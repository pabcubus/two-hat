import { User } from './user';

export interface Survey {
    id?: number;
    name?: string;
    questions?: SurveyQuestion[];
    status?: SurveyStatus;
    creatorId?: number;
    creator?: User;
    type?: SurveyType;
}

export interface SurveyType {
    id?: number;
    name?: string;
    code?: string;
}

export interface SurveyStatus {
    id?: number;
    name?: string;
    code?: string;
}

export interface SurveyQuestion {
    id?: number;
    text?: string;
    type?: SurveyQuestionType;
}

export interface SurveyQuestionType {
    id?: number;
    name?: string;
}
