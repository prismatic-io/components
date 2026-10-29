import { input, util } from "@prismatic-io/spectral";
import { connectionInput, siteId } from "./common";

const surveyId = input({
  label: "Survey ID",
  type: "string",
  required: true,
  comments: "The unique identifier (UUID) of the survey.",
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "Enter survey ID",
  clean: util.types.toString,
  dataSource: "selectSiteSurvey",
});

export const getSurveyInputs = {
  ssvConnection: connectionInput,
  siteId: { ...siteId, required: false },
  surveyId,
};
