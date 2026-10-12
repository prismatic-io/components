import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationPersonsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getOrganizationPersonsExamplePayload } from "../../examplePayloads";
import { getOrganizationPersonsOutputSchema } from "../../outputSchemas";
export const getOrganizationPersons = action({
  display: {
    label: "Get Organization Persons",
    description: "Lists persons of an organization.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { limit, cursor } = {} },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/persons", {
      params: { limit, org_id: id, cursor },
    });
    return { data };
  },
  inputs: getOrganizationPersonsInputs,
  examplePayload: getOrganizationPersonsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationPersonsOutputSchema,
  }),
});
