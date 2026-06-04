import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSurveysInputs } from "../../inputs";
import { listSurveysExamplePayload } from "../../examplePayloads";
import type { Survey } from "../../types";
import { paginateResults } from "../../util";











export const listSurveys = action({
  display: {
    label: "List Surveys",
    description: "List all surveys accessible to the authenticated user.",
  },
  inputs: listSurveysInputs,
  perform: async (context, { connection, fetchAll, page, perPage }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await paginateResults<Survey>(client, "/surveys", fetchAll, {
      page,
      per_page: perPage,
    });

    return { data };
  },
  examplePayload: listSurveysExamplePayload,
});
