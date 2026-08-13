import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDepartmentResponse as createDepartmentResponse } from "../../examplePayloads/departments";
import { connection, name } from "../../inputs";
import { createDepartmentOutputSchema } from "../../outputSchemas";
export const createDepartment = action({
  display: {
    label: "Create Department",
    description: "Create a new department",
  },
  inputs: {
    name: {
      ...name,
      comments: "The name of the department",
    },
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDepartmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, name }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/departments`, {
      name,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { name },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createDepartmentResponse,
      name: name ?? createDepartmentResponse.name,
    },
  }),
  examplePayload: {
    data: createDepartmentResponse,
  },
});
