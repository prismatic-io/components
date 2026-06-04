import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listWorkLocationsV2ExamplePayload } from "../../../examplePayloads";
import { listWorkLocationsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listWorkLocations = action({
  display: {
    label: "List Work Locations (V2)",
    description: "Retrieve a list of work locations.",
  },
  inputs: listWorkLocationsInputs,
  examplePayload: listWorkLocationsV2ExamplePayload,
  perform: async (context, { connection, orderBy, cursor, fetchAll }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/work-locations", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});
