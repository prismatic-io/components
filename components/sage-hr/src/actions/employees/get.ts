import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getEmployeeExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  employee_id,
  employment_status_history,
  position_history,
  team_history,
} from "../../inputs";

export const getEmployee = action({
  display: {
    label: "Get Employee",
    description: "Retrieve single active employee in company.",
  },
  inputs: {
    connectionInput,
    employee_id,
    team_history,
    employment_status_history,
    position_history,
  },
  perform: async (
    context,
    {
      connectionInput,
      employee_id,
      team_history,
      employment_status_history,
      position_history,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/employees/${employee_id}`, {
      params: {
        team_history: team_history || undefined,
        employment_status_history: employment_status_history || undefined,
        position_history: position_history || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getEmployeeExamplePayload,
});
