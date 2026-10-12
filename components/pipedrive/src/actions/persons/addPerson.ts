import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addPersonInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addPersonExamplePayload } from "../../examplePayloads";
import { singlePersonV2OutputSchema } from "../../outputSchemas";
export const addPerson = action({
  display: {
    label: "Add Person",
    description: "Adds a person.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      name,
      ownerId,
      orgId,
      addTime,
      contactInfo: { emails, phones, visibleTo, marketingStatus } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post("/persons", {
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
      add_time: addTime,
    });
    return { data };
  },
  inputs: addPersonInputs,
  examplePayload: addPersonExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: singlePersonV2OutputSchema,
  }),
});
