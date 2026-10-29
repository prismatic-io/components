import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { terminateEmployeeExamplePayload } from "../../examplePayloads";
import {
  comments,
  connectionInput,
  date,
  employee_id,
  termination_reason_id,
} from "../../inputs";

export const terminateEmployee = action({
  display: {
    label: "Terminate Employee",
    description: "Terminate Employee.",
  },
  inputs: {
    connectionInput,
    employee_id,
    date: { ...date, required: true },
    termination_reason_id,
    comments,
  },
  perform: async (context, { connectionInput, employee_id, ...params }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/employees/${employee_id}/terminations`,
      {
        ...params,
      },
    );
    return {
      data,
    };
  },
  examplePayload: terminateEmployeeExamplePayload,
});
