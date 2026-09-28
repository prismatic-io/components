import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createProductAttributesExamplePayload } from "../../examplePayloads";
import { createProductAttributesInputs } from "../../inputs";
import { asJsonObject } from "../../utils";
export const createProductAttributes = action({
  display: {
    label: "Create Product Attributes",
    description: "Save attribute data",
  },
  performSafety: "notAllowed",
  examplePerform: async () => createProductAttributesExamplePayload,
  perform: async (context, { connection, attribute }) => {
    const client = await getClient(connection, context.debug.enabled);
    const body = asJsonObject(attribute, "Attribute");
    const { data } = await client.post(ENDPOINTS.productAttributes, body);
    return { data };
  },
  inputs: createProductAttributesInputs,
  examplePayload: createProductAttributesExamplePayload,
});
