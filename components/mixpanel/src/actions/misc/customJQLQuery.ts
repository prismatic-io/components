import { action } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import { customJQLQueryInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { customJQLQueryExamplePayload } from "../../examplePayloads";
export const customJQLQuery = action({
  display: {
    label: "Custom JQL Query",
    description: "The HTTP API is the lowest-level way to use JQL.",
  },
  inputs: customJQLQueryInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, regionAndDomain, script, params, project_id, workspace_id },
  ) => {
    const client = createMixpanelClient(
      regionAndDomain,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.post(
      "/jql",
      {
        script,
        params,
      },
      {
        params: {
          project_id,
          workspace_id,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => customJQLQueryExamplePayload,
  examplePayload: customJQLQueryExamplePayload,
});
