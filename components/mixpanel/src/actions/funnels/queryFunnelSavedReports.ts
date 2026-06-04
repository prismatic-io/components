import { action } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import {
  connectionInput,
  project_id,
  regionAndDomain,
  workspace_id,
  funnel_id,
  from_date,
  to_date,
  length,
  length_unit,
  interval,
  unit,
  on,
  where,
  limit,
  useProjectToken,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { queryFunnelSavedReportsExamplePayload } from "../../examplePayloads";

export const queryFunnelSavedReports = action({
  display: {
    label: "Query Funnel Saved Reports",
    description: "Get data for a funnel.",
  },
  inputs: {
    connection: connectionInput,
    useProjectToken,
    regionAndDomain,
    funnel_id,
    from_date,
    to_date,
    project_id,
    workspace_id,
    length,
    length_unit,
    interval,
    unit,
    on,
    where,
    limit,
  },
  perform: async (
    context,
    {
      connection,
      useProjectToken,
      regionAndDomain,
      funnel_id,
      from_date,
      to_date,
      project_id,
      workspace_id,
      length,
      length_unit,
      interval,
      unit,
      on,
      where,
      limit,
    },
  ) => {
    const client = createMixpanelClient(
      regionAndDomain,
      connection,
      useProjectToken ? Authorization.Token : Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.get("/funnels", {
      params: {
        project_id: project_id || undefined,
        workspace_id: workspace_id || undefined,
        funnel_id: funnel_id || undefined,
        from_date: from_date || undefined,
        to_date: to_date || undefined,
        length: length || undefined,
        length_unit: length_unit || undefined,
        interval: interval || undefined,
        unit: unit || undefined,
        on: on || undefined,
        where: where || undefined,
        limit: limit || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: queryFunnelSavedReportsExamplePayload,
});
