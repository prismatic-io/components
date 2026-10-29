import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listDataChangesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { listDataChangesInputs } from "../../inputs";
import { listDataChangesOutputSchema } from "../../outputSchemas";

export const listDataChanges = action({
  display: {
    label: "List Data Changes",
    description:
      "Returns the collection of data changes accessible to the authenticated user. Supports offset and limit query parameters. Response type is determined by the 'type' query parameter. The default response includes id, name, and displayName.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      tenant,
      dataChangeType,
      dataChangeName,
      extraParameters,
      fetchAll,
      pagination = {},
    },
  ) => {
    const params = {
      type: dataChangeType,
      name: dataChangeName,
      ...extraParameters,
    };
    if (!params.type && !params.name) {
      throw new Error(
        "Set Data Change Type or Data Change Name. Workday requires one of them to list data changes.",
      );
    }
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.prismAnalytics}/${tenant}/dataChanges`,
      params,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listDataChangesExamplePayload,
  inputs: listDataChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDataChangesOutputSchema,
  }),
  examplePayload: listDataChangesExamplePayload,
});
