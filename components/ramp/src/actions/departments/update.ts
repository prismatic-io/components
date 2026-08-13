import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDepartmentResponse as updateDepartmentResponse } from "../../examplePayloads/departments";
import { connection, departmentId, name } from "../../inputs";
import { updateDepartmentOutputSchema } from "../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateDepartmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, departmentId, name }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/departments/${departmentId}`, {
      name,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { departmentId, name },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateDepartmentResponse,
      id: departmentId,
      name: name ?? updateDepartmentResponse.name,
    },
  }),
  examplePayload: {
    data: updateDepartmentResponse,
  },
});
