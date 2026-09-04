import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listExportsExamplePayload } from "../../examplePayloads";
import { listExportsInputs } from "../../inputs";
import { listExportsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listExports = action({
  display: {
    label: "List Exports",
    description:
      "Search for export definitions using filters like name or creator.",
  },
  inputs: listExportsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listExportsOutputSchema,
  }),
  examplePayload: listExportsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        name: params.name,
        description: params.description,
        "creator.guid": params.creatorGuid,
        "creator.email": params.creatorEmail,
        "creator.fullName": params.creatorFullName,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      const data = await fetchArenaList(
        client,
        "/exports",
        queryParams,
        params.fetchAll,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Exports");
    }
  },
});
