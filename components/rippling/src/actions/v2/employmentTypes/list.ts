import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listEmploymentTypesExamplePayload } from "../../../examplePayloads";
import { listEmploymentTypesInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listEmploymentTypes = action({
  display: {
    label: "List Employment Types (V2)",
    description: "Retrieve a list of employment types.",
  },
  inputs: listEmploymentTypesInputs,
  examplePayload: listEmploymentTypesExamplePayload,
  perform: async (context, { connection, orderBy, cursor, fetchAll }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/employment-types", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});
