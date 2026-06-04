import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getTeamsExamplePayload } from "../../examplePayloads";
import { getTeamsInputs } from "../../inputs";
import { paginateV1Results } from "../../utils/pagination";

const getTeams = action({
  display: {
    label: "Get Teams (V1)",
    description: "GET Teams.",
  },
  inputs: getTeamsInputs,
  examplePayload: getTeamsExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1Results(client, "/teams", fetchAll, { limit, offset });
  },
});

export default {
  getTeams,
};
