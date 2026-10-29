import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePersonInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { updatePersonExamplePayload } from "../../examplePayloads";
import { singlePersonV2OutputSchema } from "../../outputSchemas";

export const updatePerson = action({
  display: {
    label: "Update Person",
    description: "Updates a person.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      name,
      ownerId,
      orgId,
      contactInfo: { emails, phones, visibleTo, marketingStatus } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.patch(`/persons/${id}`, {
      name,
      owner_id: ownerId,
      org_id: orgId,
      emails: emails
        ?.split(",")
        .filter(Boolean)
        .map((email) => ({ value: email })),
      phones: phones
        ?.split(",")
        .filter(Boolean)
        .map((phone) => ({ value: phone })),
      visible_to: visibleTo,
      marketing_status: marketingStatus,
    });
    return { data };
  },
  inputs: updatePersonInputs,
  examplePayload: updatePersonExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: singlePersonV2OutputSchema,
  }),
});
