import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listPeopleExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { listPeopleInputs } from "../../inputs";
import { listPeopleOutputSchema } from "../../outputSchemas";
export const listPeople = action({
  display: {
    label: "List People",
    description: "Retrieves all people in the Workday tenant.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.person}/people`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listPeopleExamplePayload,
  inputs: listPeopleInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPeopleOutputSchema,
  }),
  examplePayload: listPeopleExamplePayload,
});
