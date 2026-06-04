import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listCustomFieldsV2ExamplePayload } from "../../../examplePayloads";
import { listCustomFieldsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listCustomFields = action({
  display: {
    label: "List Custom Fields (V2)",
    description: "Retrieve a list of custom fields.",
  },
  inputs: listCustomFieldsInputs,
  examplePayload: listCustomFieldsV2ExamplePayload,
  perform: async (context, { connection, orderBy, cursor, fetchAll }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/custom-fields", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});
