import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateLeadInputs } from "../../inputs";
import { updateLeadExamplePayload } from "../../examplePayloads";
import { updateLeadOutputSchema } from "../../outputSchemas";
export const updateLead = action({
  display: {
    label: "Update Lead",
    description: "Updates a lead.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      ownerId,
      labelIds,
      personId,
      organizationId,
      additionalFields: {
        title,
        value,
        expectedCloseDate,
        visibleTo,
        wasSeen,
        isArchived,
      } = {},
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/leads/${id}`, {
      title,
      owner_id: ownerId,
      label_ids: labelIds,
      person_id: personId,
      organization_id: organizationId,
      is_archived: isArchived,
      value,
      expected_close_date: expectedCloseDate,
      visible_to: visibleTo,
      was_seen: wasSeen,
    });
    return { data };
  },
  inputs: updateLeadInputs,
  examplePayload: updateLeadExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateLeadOutputSchema,
  }),
});
