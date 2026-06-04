import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getDepartmentExamplePayload } from "../../../examplePayloads";
import { getDepartmentInputs } from "../../../inputs";

export const getDepartment = action({
  display: {
    label: "Get Department (V2)",
    description: "Retrieve a specific department by ID.",
  },
  inputs: getDepartmentInputs,
  examplePayload: getDepartmentExamplePayload,
  perform: async (context, { connection, id, expand }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/departments/${id}`, {
      params: {
        expand,
      },
    });
    return { data };
  },
});
