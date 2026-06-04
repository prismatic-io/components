import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listBusinessPartnerGroupsExamplePayload } from "../../../examplePayloads";
import { listBusinessPartnerGroupsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listBusinessPartnerGroups = action({
  display: {
    label: "List Business Partner Groups (V2)",
    description: "Retrieve a list of business partner groups.",
  },
  inputs: listBusinessPartnerGroupsInputs,
  examplePayload: listBusinessPartnerGroupsExamplePayload,
  perform: async (
    context,
    { connection, expand, orderBy, cursor, fetchAll },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/business-partner-groups", fetchAll, {
      expand,
      order_by: orderBy,
      cursor,
    });
  },
});
