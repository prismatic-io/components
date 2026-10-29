import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addOrganizationInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addOrganizationExamplePayload } from "../../examplePayloads";
import { singleOrganizationV2OutputSchema } from "../../outputSchemas";

export const addOrganization = action({
  display: {
    label: "Add Organization",
    description: "Adds an organization.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, name, ownerId, visibleTo, addTime },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post("/organizations", {
      name,
      owner_id: ownerId,
      visible_to: visibleTo,
      add_time: addTime,
    });
    return { data };
  },
  inputs: addOrganizationInputs,
  examplePayload: addOrganizationExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: singleOrganizationV2OutputSchema,
  }),
});
