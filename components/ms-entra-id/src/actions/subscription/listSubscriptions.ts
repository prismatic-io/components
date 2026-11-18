import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSubscriptionsExamplePayload as examplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs as inputs } from "../../inputs/subscription";
import { listSubscriptionsOutputSchema } from "../../outputSchemas";
import { getValues } from "../../util";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Retrieves a list of active subscriptions.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSubscriptionsOutputSchema,
  }),
  examplePayload,
});
