import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_DEFINITIONS_PATH } from "../../constants";
import { listSmsDefinitionsExamplePayload } from "../../examplePayloads";
import { listSmsDefinitionsInputs } from "../../inputs";
import { listSmsDefinitionsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const listSmsDefinitions = action({
  examplePayload: listSmsDefinitionsExamplePayload,
  display: {
    label: "List SMS Definitions",
    description:
      "List transactional SMS send definitions with optional pagination.",
  },
  inputs: listSmsDefinitionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSmsDefinitionsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $pageSize: pagination.pageSize,
      $page: pagination.page,
    };
    const data = await paginateResults(
      client,
      SMS_DEFINITIONS_PATH,
      fetchAll,
      params,
      {
        itemsField: "definitions",
        preserveFields: ["requestId"],
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listSmsDefinitionsExamplePayload.data,
  }),
});
