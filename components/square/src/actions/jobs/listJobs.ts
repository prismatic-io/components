import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listJobsExamplePayload } from "../../examplePayloads";
import { listJobsInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listJobs = action({
  display: {
    label: "List Jobs",
    description: "Lists jobs in a seller account, sorted by title in ascending order.",
  },
  perform: async (context, { fetchAll, cursor, squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const data = await fetchAllPages(
      client,
      "/v2/team-members/jobs",
      "jobs",
      {
        additionalParams: {
          cursor,
        },
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  inputs: listJobsInputs,
  examplePayload: listJobsExamplePayload,
});
