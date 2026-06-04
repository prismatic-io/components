import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listSupergroupsExamplePayload } from "../../../examplePayloads";
import { listSupergroupsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listSupergroups = action({
  display: {
    label: "List Supergroups (V2)",
    description: "Retrieve supergroups matching the input parameters.",
  },
  inputs: listSupergroupsInputs,
  examplePayload: listSupergroupsExamplePayload,
  perform: async (
    context,
    { connection, filter, orderBy, cursor, fetchAll },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/supergroups", fetchAll, {
      filter,
      order_by: orderBy,
      cursor,
    });
  },
});
