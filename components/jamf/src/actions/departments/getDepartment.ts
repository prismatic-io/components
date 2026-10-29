import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDepartmentExamplePayload } from "../../examplePayloads";
import { getDepartmentInputs } from "../../inputs";
import type { Department } from "../../types";

export const getDepartment = action({
  display: {
    label: "Get Department",
    description: "Get a single department by ID.",
  },
  inputs: getDepartmentInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<Department>(
      `/v1/departments/${resourceId}`,
    );
    return { data };
  },
  examplePayload: getDepartmentExamplePayload,
});
