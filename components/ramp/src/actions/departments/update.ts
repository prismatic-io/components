import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDepartmentResponse as updateDepartmentResponse } from "../../examplePayloads/departments";
import { connection, departmentId, name } from "../../inputs";

export const updateDepartment = action({
  display: {
    label: "Update Department",
    description: "Update a department by ID",
  },
  inputs: {
    departmentId: {
      ...departmentId,
      comments: "The ID of the department to update",
    },
    name: {
      ...name,
      comments: "The updated name of the department",
      required: true,
    },
    connection,
  },
  perform: async (context, { connection, departmentId, name }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/departments/${departmentId}`, {
      name,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateDepartmentResponse,
  },
});
