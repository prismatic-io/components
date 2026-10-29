import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { rehireEmployeeExamplePayload } from "../../examplePayloads";
import {
  comments,
  connectionInput,
  date,
  employee_id,
  start_fresh,
} from "../../inputs";

export const rehireEmployee = action({
  display: {
    label: "Rehire Employee",
    description: "Rehire Employee.",
  },
  inputs: {
    connectionInput,
    employee_id,
    date: {
      ...date,
      label: "New start working day",
      comments: "format: YYYY-MM-DD",
      required: true,
    },
    comments,
    start_fresh,
  },
  perform: async (context, { connectionInput, employee_id, ...params }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(`/employees/${employee_id}/rehire`, {
      ...params,
    });
    return {
      data,
    };
  },
  examplePayload: rehireEmployeeExamplePayload,
});
