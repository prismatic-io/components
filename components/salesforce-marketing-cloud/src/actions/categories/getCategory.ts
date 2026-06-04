import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { getCategoryExamplePayload } from "../../examplePayloads/categories";
import { getCategoryInputs } from "../../inputs/categories";

export const getCategory = action({
  examplePayload: getCategoryExamplePayload,
  display: {
    label: "Get Category",
    description:
      "Retrieve a single Content Builder category (folder) by its ID.",
  },
  inputs: getCategoryInputs,
  perform: async (context, { connection, categoryId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`${CATEGORIES_PATH}/${categoryId}`);

    return { data };
  },
});
