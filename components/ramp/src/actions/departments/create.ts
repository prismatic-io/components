import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDepartmentResponse as createDepartmentResponse } from "../../examplePayloads/departments";
import { connection, name } from "../../inputs";

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
  perform: async (context, { connection, name }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/departments`, {
      name,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createDepartmentResponse,
  },
});
