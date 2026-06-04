import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listBusinessPartnersExamplePayload } from "../../../examplePayloads";
import { listBusinessPartnersInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listBusinessPartners = action({
  display: {
    label: "List Business Partners (V2)",
    description: "Retrieve a list of business partners.",
  },
  inputs: listBusinessPartnersInputs,
  examplePayload: listBusinessPartnersExamplePayload,
  perform: async (
    context,
    { connection, filter, expand, orderBy, cursor, fetchAll },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/business-partners", fetchAll, {
      filter,
      expand,
      order_by: orderBy,
      cursor,
    });
  },
});
