import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDepartmentExamplePayload } from "../../examplePayloads";
import { createDepartmentInputs } from "../../inputs";
import type { JamfCreateResponse } from "../../types";

export const createDepartment = action({
  display: {
    label: "Create Department",
    description: "Create a new department.",
  },
  inputs: createDepartmentInputs,
  perform: async (context, { connection, departmentName }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post<JamfCreateResponse>("/v1/departments", {
      name: departmentName,
    });
    return { data };
  },
  examplePayload: createDepartmentExamplePayload,
});
