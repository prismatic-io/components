import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { deleteObjectCategoryExamplePayload } from "../../../examplePayloads";
import { deleteObjectCategoryInputs } from "../../../inputs";

export const deleteObjectCategory = action({
  display: {
    label: "Delete Object Category (V2)",
    description: "Delete an object category by ID.",
  },
  inputs: deleteObjectCategoryInputs,
  examplePayload: deleteObjectCategoryExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    await client.delete(`/object-categories/${id}/`);
    return {
      data: {
        success: true,
        message: `Object category ${id} deleted successfully.`,
      },
    };
  },
});
