import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getLevelsExamplePayload } from "../../examplePayloads";
import { getLevelsInputs } from "../../inputs";
import { paginateV1Results } from "../../utils/pagination";
const getLevels = action({
  display: {
    label: "Get Levels (V1)",
    description: "GET Levels.",
  },
  inputs: getLevelsInputs,
  examplePayload: getLevelsExamplePayload,
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1Results(client, "/levels", fetchAll, {
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
});
export default {
  getLevels,
};
