import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { $skipToken, connection, fetchAll } from "../../inputs/general";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all Subscriptions.",
  },
  perform: async (context, { connection, $skipToken, fetchAll }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $skipToken,
    };

    const data = await paginateResults(
      client,
      "/subscriptions",
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    fetchAll,
    $skipToken,
  },
  examplePayload: listSubscriptionsExamplePayload,
});
