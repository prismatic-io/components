import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDirectoryAuditsExamplePayload } from "../../examplePayloads";
import { listDirectoryAuditsInputs } from "../../inputs";
import { listDirectoryAuditsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util";

export const listDirectoryAudits = action({
  display: {
    label: "List Directory Audits",
    description: "Retrieve a list of directory audits.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDirectoryAuditsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $filter: filters.$filter,
      $orderBy: filters.$orderBy,
      $skipToken: pagination.$skipToken,
      $top: pagination.$top,
    };

    const data = await paginateResults(
      client,
      ENDPOINTS.DIRECTORY_AUDITS,
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  examplePerform: async () => listDirectoryAuditsExamplePayload,
  inputs: listDirectoryAuditsInputs,
  examplePayload: listDirectoryAuditsExamplePayload,
});
