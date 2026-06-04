import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { listSiteSurveysExamplePayload } from "../../examplePayloads/sites";
import { listSiteSurveysInputs } from "../../inputs";
import { fetchPaginatedResults } from "../../util";






export const listSiteSurveys = action({
  display: {
    label: "List Site Surveys",
    description: "Retrieve a list of surveys and folders for a specific site.",
  },
  inputs: listSiteSurveysInputs,
  perform: async (
    context,
    { ssvConnection, siteId, fetchAll, pageNumber, pageSize },
  ) => {
    const client = await createSsvClient(ssvConnection, context);

    const data = await fetchPaginatedResults(
      client,
      `/v3/site/${siteId}/surveys`,
      {
        fetchAll,
        pageNumber,
        pageSize,
        dataKey: "surveys",
      },
    );

    return { data };
  },
  examplePayload: listSiteSurveysExamplePayload,
});
