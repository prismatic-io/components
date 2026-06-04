import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listWorkersExamplePayload } from "../../../examplePayloads";
import { listWorkersInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listWorkers = action({
  display: {
    label: "List Workers (V2)",
    description:
      "Retrieve a list of workers with filtering, expansion, and sorting support.",
  },
  inputs: listWorkersInputs,
  examplePayload: listWorkersExamplePayload,
  perform: async (
    context,
    { connection, fetchAll, filter, expand, orderBy, cursor },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/workers", fetchAll, {
      filter,
      expand,
      order_by: orderBy,
      cursor,
    });
  },
});
