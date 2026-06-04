import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getCustomFieldsExamplePayload } from "../../examplePayloads";
import { getCustomFieldsInputs } from "../../inputs";
import { paginateV1Results } from "../../utils/pagination";

const getCustomFields = action({
  display: {
    label: "Get Custom Fields (V1)",
    description: "GET Custom Fields.",
  },
  inputs: getCustomFieldsInputs,
  examplePayload: getCustomFieldsExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1Results(client, "/custom_fields", fetchAll, {
      limit,
      offset,
    });
  },
});

export default {
  getCustomFields,
};
