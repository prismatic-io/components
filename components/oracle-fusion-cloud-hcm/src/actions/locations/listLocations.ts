import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listLocationsExamplePayload } from "../../examplePayloads/locations";
import { listLocationsInputs } from "../../inputs";
import { listLocationsOutputSchema } from "../../outputSchemas";
import type { Location } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listLocations = action({
  display: {
    label: "List Locations",
    description:
      "Retrieve a paginated list of work locations from Oracle Fusion Cloud HCM.",
  },
  examplePayload: listLocationsExamplePayload,
  inputs: listLocationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listLocationsOutputSchema,
  }),
  perform: async (
    context,
    { connection, fetchAll, pagination, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Location>(
      client,
      "/locationsV2",
      fetchAll,
      {
        offset: pagination.offset,
        limit: pagination.limit,
        effectiveDate,
        onlyData: includeMetadataLinks,
      },
    );
    return { data };
  },
});
