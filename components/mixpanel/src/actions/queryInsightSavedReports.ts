import { action } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../client";
import {
  connectionInput,
  regionAndDomain,
  project_id,
  workspace_id,
  bookmark_id,
} from "../inputs";
import { Authorization } from "../enums/Authorization";
import { queryInsightsSavedReportsExamplePayload } from "../examplePayloads";

export const queryInsightsSavedReports = action({
  display: {
    label: "Query Insights Saved Reports",
    description: "Get data from your Insights reports.",
  },
  inputs: {
    connection: connectionInput,
    regionAndDomain,
    bookmark_id,
    project_id,
    workspace_id,
  },
  perform: async (
    context,
    { connection, regionAndDomain, bookmark_id, project_id, workspace_id },
  ) => {
    const client = createMixpanelClient(
      regionAndDomain,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.get("/insights", {
      params: {
        bookmark_id: bookmark_id || undefined,
        project_id: project_id || undefined,
        workspace_id: workspace_id || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: queryInsightsSavedReportsExamplePayload,
});
