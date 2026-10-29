import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteActivityInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deleteActivityExamplePayload } from "../../examplePayloads";
import { deleteActivityOutputSchema } from "../../outputSchemas";

export const deleteActivity = action({
  display: {
    label: "Delete Activity",
    description: "Deletes an activity.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(`/activities/${id}`);
    return { data };
  },
  inputs: deleteActivityInputs,
  examplePayload: deleteActivityExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteActivityOutputSchema,
  }),
});
