import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getEmploymentTypeExamplePayload } from "../../../examplePayloads";
import { getEmploymentTypeInputs } from "../../../inputs";

export const getEmploymentType = action({
  display: {
    label: "Get Employment Type (V2)",
    description: "Retrieve a specific employment type by ID.",
  },
  inputs: getEmploymentTypeInputs,
  examplePayload: getEmploymentTypeExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/employment-types/${id}`);
    return { data };
  },
});
