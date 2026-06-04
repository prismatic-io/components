import { dataSource } from "@prismatic-io/spectral";

import { createSsvClient } from "../client";
import { selectSiteSurveyExamplePayload } from "../examplePayloads/dataSources";
import { selectSiteSurveyInputs } from "../inputs";
import type { SurveyListResponse } from "../types";
import { fetchPaginatedResults, sortByLabel } from "../util";


export const selectSiteSurvey = dataSource({
  display: {
    label: "Select Site Survey",
    description: "Select a survey from a specific System Surveyor site.",
  },
  inputs: selectSiteSurveyInputs,
  perform: async (_context, params) => {
    const client = await createSsvClient(params.ssvConnection);
    const data = (await fetchPaginatedResults(
      client,
      `/v3/site/${params.siteId}/surveys`,
      { fetchAll: true, dataKey: "surveys" },
    )) as SurveyListResponse;

    const result = sortByLabel(
      data.surveys.map((survey) => ({
        label: survey.title,
        key: survey.id,
      })),
    );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectSiteSurveyExamplePayload,
});
