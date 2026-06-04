import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput, fetchAll, page, perPage, extraBody } from "./common";





export const surveyId = input({
  label: "Survey ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the survey.",
  example: "1234567890",
  placeholder: "Enter survey ID",
  dataSource: "selectSurvey",
  clean: util.types.toString,
});

export const surveyTitle = input({
  label: "Survey Title",
  type: "string",
  required: true,
  comments:
    "The display name shown to respondents when they access the survey.",
  example: "Customer Satisfaction Survey",
  placeholder: "Enter survey title",
  clean: util.types.toString,
});

export const surveyNickname = input({
  label: "Nickname",
  type: "string",
  required: false,
  comments: "Internal nickname for the survey (not shown to respondents).",
  example: "Q1 2026 CSAT",
  placeholder: "Enter survey nickname",
  clean: toOptionalString,
});

export const fromTemplateId = input({
  label: "Template ID",
  type: "string",
  required: false,
  comments:
    "ID of an existing template to copy. Use this OR 'From Survey ID', not both.",
  example: "1234567890",
  placeholder: "Enter template ID",
  clean: toOptionalString,
});

export const fromSurveyId = input({
  label: "From Survey ID",
  type: "string",
  required: false,
  comments:
    "ID of an existing survey to copy. Use this OR 'Template ID', not both.",
  example: "1234567890",
  placeholder: "Enter survey ID",
  clean: toOptionalString,
});

export const surveyLanguage = input({
  label: "Language",
  type: "string",
  required: false,
  default: "en",
  comments: "Language code for the survey (e.g., 'en', 'es', 'fr').",
  example: "en",
  placeholder: "Enter language code",
  clean: toOptionalString,
});





export const listSurveysInputs = {
  connection: connectionInput,
  fetchAll,
  page,
  perPage,
};

export const getSurveyInputs = {
  connection: connectionInput,
  surveyId,
};

export const createSurveyInputs = {
  connection: connectionInput,
  title: surveyTitle,
  nickname: surveyNickname,
  fromTemplateId,
  fromSurveyId,
  language: surveyLanguage,
  extraBody,
};

export const deleteSurveyInputs = {
  connection: connectionInput,
  surveyId,
};

export const selectSurveyInputs = {
  connection: connectionInput,
};
