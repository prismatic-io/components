import { action, outputSchema } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import { listSavedFunnelsInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { listSavedFunnelsExamplePayload } from "../../examplePayloads";
import { listSavedFunnelsOutputSchema } from "../../outputSchemas";
export const listSavedFunnels = action({
  display: {
    label: "List Saved Funnels",
    description: "Get the names and funnel_ids of the funnels.",
  },
  inputs: listSavedFunnelsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSavedFunnelsOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, project_id, regionAndDomain, workspace_id, useProjectToken },
  ) => {
    const client = createMixpanelClient(
      regionAndDomain,
      connection,
      useProjectToken ? Authorization.Token : Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.get("/funnels/list", {
      params: {
        project_id,
        workspace_id,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listSavedFunnelsExamplePayload,
});
