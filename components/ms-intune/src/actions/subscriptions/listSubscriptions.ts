import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs } from "../../inputs";
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
      ENDPOINTS.SUBSCRIPTIONS,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listSubscriptionsInputs,
  examplePayload: listSubscriptionsExamplePayload,
});
