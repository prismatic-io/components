import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { paginateResults } from "../../util/pagination";
import { listMessageTemplatesExamplePayload } from "../../examplePayloads";
import { listMessageTemplatesInputs } from "../../inputs";
import { listMessageTemplatesOutputSchema } from "../../outputSchemas";

export const listMessageTemplates = action({
  display: {
    label: "List Message Templates",
    description: "Retrieves message templates.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.connect}/messageTemplates`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listMessageTemplatesExamplePayload,
  inputs: listMessageTemplatesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMessageTemplatesOutputSchema,
  }),
  examplePayload: listMessageTemplatesExamplePayload,
});
