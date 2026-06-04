import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listCompaniesV2ExamplePayload } from "../../../examplePayloads";
import { listCompaniesInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listCompanies = action({
  display: {
    label: "List Companies (V2)",
    description: "Retrieve a list of companies.",
  },
  inputs: listCompaniesInputs,
  examplePayload: listCompaniesV2ExamplePayload,
  perform: async (
    context,
    { connection, expand, orderBy, cursor, fetchAll },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/companies", fetchAll, {
      expand,
      order_by: orderBy,
      cursor,
    });
  },
});
