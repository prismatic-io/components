import { action } from "@prismatic-io/spectral";
import { createDataBricksClient } from "../client";
import { getCurrentUserExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description:
      "Get the currently authenticated Databricks user or service principal.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    
    const response = await client.get("/preview/scim/v2/Me");
    return { data: response.data };
  },
  examplePayload: getCurrentUserExamplePayload,
});

export default { getCurrentUser };
