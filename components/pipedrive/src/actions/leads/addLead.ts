import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addLeadInputs } from "../../inputs";
import { addLeadExamplePayload } from "../../examplePayloads";
import { addLeadOutputSchema } from "../../outputSchemas";
export const addLead = action({
  display: {
    label: "Add Lead",
    description: "Adds a lead.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      title,
      ownerId,
      labelIds,
      personId,
      organizationId,
      additionalFields: { value, expectedCloseDate, visibleTo, wasSeen } = {},
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/leads", {
      title,
      owner_id: ownerId,
      label_ids: labelIds,
      person_id: personId,
      organization_id: organizationId,
      value,
      expected_close_date: expectedCloseDate,
      visible_to: visibleTo,
      was_seen: wasSeen,
    });
    return { data };
  },
  inputs: addLeadInputs,
  examplePayload: addLeadExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addLeadOutputSchema,
  }),
});
