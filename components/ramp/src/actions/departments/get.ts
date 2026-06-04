import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDepartmentResponse } from "../../examplePayloads/departments";
import { connection, departmentId } from "../../inputs";

export const getDepartment = action({
  display: {
    label: "Get Department",
    description: "Retrieve a department by ID",
  },
  inputs: {
    departmentId,
    connection,
  },
  perform: async (context, { connection, departmentId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/departments/${departmentId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getDepartmentResponse,
  },
});
