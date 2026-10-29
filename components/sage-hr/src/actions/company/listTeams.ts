import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTeamsExamplePayload } from "../../examplePayloads";
import { connectionInput, fetchAll, page } from "../../inputs";
import { fetchAllRecords } from "../../util";

export const listTeams = action({
  display: {
    label: "List Teams",
    description: "List teams in company",
  },
  inputs: {
    connectionInput,
    fetchAll,
    page,
  },
  perform: async (context, { connectionInput, fetchAll, page }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    if (fetchAll) {
      const data = await fetchAllRecords(client, "/teams");
      return { data };
    }

    const { data } = await client.get("/teams", {
      params: { page: page || undefined },
    });
    return { data };
  },
  examplePayload: listTeamsExamplePayload,
});
