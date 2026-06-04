import { action } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import {
  connectionInput,
  project_id,
  regionAndDomain,
  useProjectToken,
  workspace_id,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { listSavedFunnelsExamplePayload } from "../../examplePayloads";

export const listSavedFunnels = action({
  display: {
    label: "List Saved Funnels",
    description: "Get the names and funnel_ids of your funnels.",
  },
  inputs: {
    connection: connectionInput,
    useProjectToken,
    regionAndDomain,
    project_id: { ...project_id, required: true },
    workspace_id,
  },
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
        project_id: project_id || undefined,
        workspace_id: workspace_id || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listSavedFunnelsExamplePayload,
});
