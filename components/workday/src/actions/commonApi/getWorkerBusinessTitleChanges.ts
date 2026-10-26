import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerBusinessTitleChangesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getWorkerBusinessTitleChangesInputs } from "../../inputs";
import { getWorkerBusinessTitleChangesOutputSchema } from "../../outputSchemas";
export const getWorkerBusinessTitleChanges = action({
  display: {
    label: "Get Worker Business Title Changes",
    description:
      "Retrieves a collection of business title changes for the specified worker.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, workerId, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.common}/workers/${workerId}/businessTitleChanges`,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => getWorkerBusinessTitleChangesExamplePayload,
  inputs: getWorkerBusinessTitleChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkerBusinessTitleChangesOutputSchema,
  }),
  examplePayload: getWorkerBusinessTitleChangesExamplePayload,
});
