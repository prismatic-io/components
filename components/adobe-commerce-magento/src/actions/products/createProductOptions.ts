import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createProductOptionsExamplePayload } from "../../examplePayloads";
import { createProductOptionsInputs } from "../../inputs";
import { asJsonObject } from "../../utils";
export const createProductOptions = action({
  display: {
    label: "Create Product Options",
    description: "Save Custom Option",
  },
  performSafety: "notAllowed",
  examplePerform: async () => createProductOptionsExamplePayload,
  perform: async (context, { connection, option }) => {
    const client = await getClient(connection, context.debug.enabled);
    const body = asJsonObject(option, "Option");
    const { data } = await client.post(ENDPOINTS.productOptions, body);
    return { data };
  },
  inputs: createProductOptionsInputs,
  examplePayload: createProductOptionsExamplePayload,
});
