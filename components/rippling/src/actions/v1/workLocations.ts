import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getWorkLocationsExamplePayload } from "../../examplePayloads";
import { getWorkLocationsInputs } from "../../inputs";
import { paginateV1Results } from "../../utils/pagination";
const getWorkLocations = action({
  display: {
    label: "Get Work Locations (V1)",
    description: "GET Work Locations.",
  },
  inputs: getWorkLocationsInputs,
  examplePayload: getWorkLocationsExamplePayload,
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1Results(client, "/work_locations", fetchAll, {
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
});
export default {
  getWorkLocations,
};
