import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDrivesExamplePayload } from "../../examplePayloads";
import { listDrivesInputs } from "../../inputs";
import { getSkipToken, paginateResults, resolvePagination } from "../../util";
import { listDrivesOutputSchema } from "../../outputSchemas";

export const listDrives = action({
  display: {
    label: "List Drives",
    description: "List all drives within any given SharePoint site.",
  },
  inputs: listDrivesInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = `/sites/${params.siteId}/drives`;

    if (params.fetchAll) {
      const results = await paginateResults(client, endpoint, { returnFullData: true });
      return { data: results };
    }

    const { pageLimit, pageToken } = resolvePagination(params);
    const { data } = await client.get(endpoint, {
      params: pageLimit || pageToken ? { $top: pageLimit, $skipToken: pageToken } : undefined,
    });

    if (data["@odata.nextLink"]) {
      data["@odata.nextToken"] = getSkipToken(data["@odata.nextLink"]);
    }

    return { data };
  },
  examplePerform: async () => listDrivesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDrivesOutputSchema,
  }),
  examplePayload: listDrivesExamplePayload,
});
