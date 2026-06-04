import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listEmployeesExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  employment_status_history,
  fetchAll,
  page,
  position_history,
  team_history,
} from "../../inputs";
import { fetchAllRecords } from "../../util";

export const listEmployees = action({
  display: {
    label: "List Employees",
    description: "List active employees in company.",
  },
  inputs: {
    connectionInput,
    team_history,
    employment_status_history,
    position_history,
    fetchAll,
    page,
  },
  perform: async (
    context,
    {
      connectionInput,
      fetchAll,
      page,
      team_history,
      employment_status_history,
      position_history,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const params = {
      team_history: team_history || undefined,
      employment_status_history: employment_status_history || undefined,
      position_history: position_history || undefined,
    };

    if (fetchAll) {
      const data = await fetchAllRecords(client, "/employees", params);
      return { data };
    }

    const { data } = await client.get("/employees", {
      params: { ...params, page: page || undefined },
    });
    return { data };
  },
  examplePayload: listEmployeesExamplePayload,
});
