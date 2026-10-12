import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getActivityInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getActivityExamplePayload } from "../../examplePayloads";
import { getActivityOutputSchema } from "../../outputSchemas";
export const getActivity = action({
  display: {
    label: "Get Activity",
    description: "Gets details of an activity.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/activities/${id}`);
    return { data };
  },
  inputs: getActivityInputs,
  examplePayload: getActivityExamplePayload,
  examplePerform: async () => getActivityExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getActivityOutputSchema,
  }),
});
