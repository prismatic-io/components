import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listObjectCategoriesExamplePayload } from "../../../examplePayloads";
import { listObjectCategoriesInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listObjectCategories = action({
  display: {
    label: "List Object Categories (V2)",
    description: "Retrieve a list of object categories.",
  },
  inputs: listObjectCategoriesInputs,
  examplePayload: listObjectCategoriesExamplePayload,
  perform: async (context, { connection, fetchAll, orderBy, cursor }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/object-categories/", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});
