import { action, outputSchema } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import { queryFunnelSavedReportsInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { queryFunnelSavedReportsExamplePayload } from "../../examplePayloads";
import { queryFunnelSavedReportsOutputSchema } from "../../outputSchemas";
export const queryFunnelSavedReports = action({
  display: {
    label: "Query Funnel Saved Reports",
    description: "Get data for a funnel.",
  },
  inputs: queryFunnelSavedReportsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: queryFunnelSavedReportsOutputSchema,
  }),
  performSafety: "safe",
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
      segmentation,
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
        project_id,
        workspace_id,
        funnel_id,
        from_date,
        to_date,
        length,
        length_unit,
        interval,
        unit,
        on: segmentation.on,
        where: segmentation.where,
        limit: segmentation.limit,
      },
    });
    return {
      data,
    };
  },
  examplePayload: queryFunnelSavedReportsExamplePayload,
});
