import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { updateObjectCategoryExamplePayload } from "../../../examplePayloads";
import { updateObjectCategoryInputs } from "../../../inputs";

export const updateObjectCategory = action({
  display: {
    label: "Update Object Category (V2)",
    description: "Update an existing object category.",
  },
  inputs: updateObjectCategoryInputs,
  examplePayload: updateObjectCategoryExamplePayload,
  perform: async (context, { connection, id, name, description }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.patch(`/object-categories/${id}/`, {
      name,
      description,
    });
    return { data };
  },
});
