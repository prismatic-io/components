import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getObjectCategoryExamplePayload } from "../../../examplePayloads";
import { getObjectCategoryInputs } from "../../../inputs";

export const getObjectCategory = action({
  display: {
    label: "Get Object Category (V2)",
    description: "Retrieve a specific object category by ID.",
  },
  inputs: getObjectCategoryInputs,
  examplePayload: getObjectCategoryExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/object-categories/${id}/`);
    return { data };
  },
});
