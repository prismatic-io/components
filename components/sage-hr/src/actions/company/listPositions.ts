import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPositionsExamplePayload } from "../../examplePayloads";
import { connectionInput, fetchAll, page } from "../../inputs";
import { fetchAllRecords } from "../../util";

export const listPositions = action({
  display: {
    label: "List Positions",
    description: "List positions in company",
  },
  inputs: {
    connectionInput,
    fetchAll,
    page,
  },
  perform: async (context, { connectionInput, fetchAll, page }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    if (fetchAll) {
      const data = await fetchAllRecords(client, "/positions");
      return { data };
    }

    const { data } = await client.get("/positions", {
      params: { page: page || undefined },
    });
    return { data };
  },
  examplePayload: listPositionsExamplePayload,
});
