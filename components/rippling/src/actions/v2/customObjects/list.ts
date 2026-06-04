import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listCustomObjectsExamplePayload } from "../../../examplePayloads";
import { listCustomObjectsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listCustomObjects = action({
  display: {
    label: "List Custom Objects (V2)",
    description: "Retrieve a list of custom objects.",
  },
  inputs: listCustomObjectsInputs,
  examplePayload: listCustomObjectsExamplePayload,
  perform: async (context, { connection, fetchAll, orderBy, cursor }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/custom-objects/", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});
