import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { paginateResults } from "../util";
import { selectSurveyInputs } from "../inputs";
import { selectSurveyExamplePayload } from "../examplePayloads";
import type { Survey } from "../types";












export const selectSurvey = dataSource({
  display: {
    label: "Select Survey",
    description: "A picklist of your SurveyMonkey surveys.",
  },
  inputs: selectSurveyInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    
    const response = await paginateResults<Survey>(
      client,
      "/surveys",
      true, 
    );

    
    const result = response.data.map<Element>((survey) => ({
      label: survey.title,
      key: survey.id,
    }));

    return { result };
  },
  examplePayload: selectSurveyExamplePayload,
  dataSourceType: "picklist",
});
