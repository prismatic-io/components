import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, fetchAll } from "../../inputs";
import { fetchAllRecords } from "../../util";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "List projects",
  },
  inputs: {
    connectionInput,
    fetchAll,
  },
  perform: async (context, { connectionInput, fetchAll }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    if (fetchAll) {
      const data = await fetchAllRecords(client, "/timesheets/projects/");
      return { data };
    }

    const { data } = await client.get("/timesheets/projects/");
    return { data };
  },
});
