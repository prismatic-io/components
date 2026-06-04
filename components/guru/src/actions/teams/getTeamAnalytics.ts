import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { getTeamAnalyticsInputs } from "../../inputs";
import { fetchGuruResults } from "../../util";
import { getTeamAnalyticsPayload } from "../../examplePayloads";

export const getTeamAnalytics = action({
  display: {
    label: "Get Team Analytics",
    description: "Retrieve analytics data for the team",
  },
  perform: async (
    context,
    { connection, teamId, fromDate, toDate, fetchAll },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const data = await fetchGuruResults(
      client,
      `/teams/${teamId}/analytics`,
      fetchAll,
      {
        fromDate,
        toDate,
      },
    );

    return { data };
  },
  inputs: getTeamAnalyticsInputs,
  examplePayload: getTeamAnalyticsPayload,
});
