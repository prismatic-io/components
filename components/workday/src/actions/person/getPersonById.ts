import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getPersonByIdExamplePayload } from "../../examplePayloads";
import { getPersonByIdInputs } from "../../inputs";
import { getPersonByIdOutputSchema } from "../../outputSchemas";
export const getPersonById = action({
  display: {
    label: "Get Person by ID",
    description:
      "Retrieves a person with the specified ID. IDs returned from 'List People' or 'List Workers' can be used to retrieve further information about a specific person.",
  },
  performSafety: "safe",
  perform: async (context, { connection, personId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.person}/people/${personId}`);
    return {
      data,
    };
  },
  inputs: getPersonByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonByIdOutputSchema,
  }),
  examplePayload: getPersonByIdExamplePayload,
});
