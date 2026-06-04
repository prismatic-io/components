import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { deleteCustomObjectExamplePayload } from "../../../examplePayloads";
import { deleteCustomObjectInputs } from "../../../inputs";

export const deleteCustomObject = action({
  display: {
    label: "Delete Custom Object (V2)",
    description: "Delete a custom object by API name.",
  },
  inputs: deleteCustomObjectInputs,
  examplePayload: deleteCustomObjectExamplePayload,
  perform: async (context, { connection, customObjectApiName }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    await client.delete(`/custom-objects/${customObjectApiName}/`);
    return {
      data: {
        success: true,
        message: `Custom object ${customObjectApiName} deleted successfully.`,
      },
    };
  },
});
