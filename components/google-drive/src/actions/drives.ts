import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import { fetchDrives } from "../helpers/pagination";

export const listDrives = action({
  display: {
    label: "List Drives",
    description: "List all drives",
  },
  inputs: { connection },
  perform: async (_context, params) => {
    const client = createClient(params.connection);
    const { drives } = await fetchDrives({
      drive: client,
      initialParams: {},
      fetchAll: true,
    });
    return { data: drives };
  },
});
