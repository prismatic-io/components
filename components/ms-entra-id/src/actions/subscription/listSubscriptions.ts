import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSubscriptionsExamplePayload as examplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs as inputs } from "../../inputs/subscription";
import { getValues } from "../../util";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Retrieves a list of active subscriptions.",
  },
  perform: async (context, { connection, getAllPaginatedResults }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await getValues(
      getAllPaginatedResults,
      client,
      `/subscriptions`,
      {},
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
