import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listJobFunctionsExamplePayload } from "../../../examplePayloads";
import { listJobFunctionsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listJobFunctions = action({
  display: {
    label: "List Job Functions (V2)",
    description: "Retrieve a list of job functions.",
  },
  inputs: listJobFunctionsInputs,
  examplePayload: listJobFunctionsExamplePayload,
  perform: async (context, { connection, orderBy, cursor, fetchAll }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/job-functions", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});
