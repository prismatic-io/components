import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSurveyInputs } from "../../inputs";
import { createSurveyExamplePayload } from "../../examplePayloads";
import type { Survey, CreateSurveyInput } from "../../types";

export const createSurvey = action({
  display: {
    label: "Create Survey",
    description:
      "Create a new survey. Can be blank, from a template, or copied from an existing survey.",
  },
  inputs: createSurveyInputs,
  perform: async (
    context,
    {
      connection,
      title,
      nickname,
      fromTemplateId,
      fromSurveyId,
      language,
      extraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body: CreateSurveyInput = {
      title,
      nickname,
      from_template_id: fromTemplateId,
      from_survey_id: fromSurveyId,
      language,
      ...extraBody,
    };

    const { data } = await client.post<Survey>("/surveys", body);

    return { data };
  },
  examplePayload: createSurveyExamplePayload,
});
