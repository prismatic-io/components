import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { positionsExamplePayload } from "../examplePayloads";
import { connectionInput, page } from "../inputs";

export const positions = dataSource({
  display: {
    label: "Fetch Positions",
    description: "Fetch an array of positions",
  },
  inputs: {
    connection: connectionInput,
    page,
  },
  perform: async (_context, { connection, page }) => {
    const client = createClient(connection, false);
    const { data } = await client.get(`/timesheets/positions`, {
      params: {
        page: page || undefined,
      },
    });
    if (data.data) {
      const result = data.data.map((team: Record<string, string>) => ({
        label: team.name,
        key: team.id,
      }));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: positionsExamplePayload,
});
