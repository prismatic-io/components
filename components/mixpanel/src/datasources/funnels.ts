import { dataSource, type Element } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../client";
import {
  connectionInput,
  project_id,
  regionAndDomain,
  workspace_id,
} from "../inputs";
import { Authorization } from "../enums/Authorization";

interface Funnel {
  funnel_id: string;
  name: string;
}

export const funnels = dataSource({
  display: {
    label: "Fetch Funnels",
    description: "Fetch an array of funnels",
  },
  inputs: {
    connection: connectionInput,
    regionAndDomain,
    project_id: { ...project_id, required: true },
    workspace_id,
  },
  perform: async (
    _context,
    { connection, regionAndDomain, project_id, workspace_id },
  ) => {
    const client = createMixpanelClient(
      regionAndDomain,
      connection,
      Authorization.Account,
      false,
    );
    const { data } = await client.get<Funnel[]>("/funnels/list", {
      params: {
        project_id: project_id || undefined,
        workspace_id: workspace_id || undefined,
      },
    });
    if (data.length) {
      const result = data.map<Element>((funnel) => ({
        label: funnel.name,
        key: funnel.funnel_id.toString(),
      }));
      return { result };
    }

    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Signup funnel", key: "7509" },
      { label: "Funnel tutorial", key: "9070" },
    ],
  },
});
