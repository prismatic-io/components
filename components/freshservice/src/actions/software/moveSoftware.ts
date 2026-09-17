import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { moveSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { moveSoftwareInputs as inputs } from "../../inputs";
import { moveSoftwareOutputSchema } from "../../outputSchemas";
export const moveSoftware = action({
  display: {
    label: "Move Software",
    description: "Moves a software application to a different workspace.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, applicationId, workspaceId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = { workspace_id: workspaceId };
    const { data } = await client.put(
      `/applications/${applicationId}/move_workspace`,
      payload,
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: moveSoftwareOutputSchema,
  }),
  inputs,
  examplePayload,
});
