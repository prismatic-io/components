import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listImportsExamplePayload } from "../../examplePayloads";
import { listImportsInputs } from "../../inputs";
import { listImportsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listImports = action({
  display: {
    label: "List Imports",
    description:
      "Search for import definitions using filters like name or creator.",
  },
  inputs: listImportsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listImportsOutputSchema,
  }),
  examplePayload: listImportsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        name: params.name,
        description: params.description,
        resource: params.resource,
        mode: params.mode,
        "creator.guid": params.creatorGuid,
        "creator.email": params.creatorEmail,
        "creator.fullName": params.creatorFullName,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      context.logger.info("Fetching imports from Arena");
      const data = await fetchArenaList(
        client,
        "/imports",
        queryParams,
        params.fetchAll,
      );
      context.logger.info(`Successfully retrieved ${data?.count || 0} imports`);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Imports");
    }
  },
});
