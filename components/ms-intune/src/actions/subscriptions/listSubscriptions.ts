import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs } from "../../inputs";
import { listSubscriptionsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all Subscriptions.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSubscriptionsOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => listSubscriptionsExamplePayload,
  inputs: listSubscriptionsInputs,
  examplePayload: listSubscriptionsExamplePayload,
});
