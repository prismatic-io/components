import { action } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../client";
import {
  connectionInput,
  regionAndDomain,
  script,
  params,
  project_id,
  workspace_id,
} from "../inputs";
import { Authorization } from "../enums/Authorization";
import { customJQLQueryExamplePayload } from "../examplePayloads";

export const customJQLQuery = action({
  display: {
    label: "Custom JQL Query",
    description: "The HTTP API is the lowest-level way to use JQL.",
  },
  inputs: {
    connection: connectionInput,
    regionAndDomain,
    script,
    params,
    project_id,
    workspace_id,
  },
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
        script: script || undefined,
        params: params || undefined,
      },
      {
        params: {
          project_id: project_id || undefined,
          workspace_id: workspace_id || undefined,
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: customJQLQueryExamplePayload,
});
