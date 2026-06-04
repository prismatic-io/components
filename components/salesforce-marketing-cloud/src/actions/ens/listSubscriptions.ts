import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_SUBSCRIPTIONS_PATH } from "../../constants";
import { listSubscriptionsExamplePayload } from "../../examplePayloads";
import { listSubscriptionsInputs } from "../../inputs";

export const listSubscriptions = action({
  examplePayload: listSubscriptionsExamplePayload,
  display: {
    label: "List ENS Subscriptions",
    description: "List Event Notification Service (ENS) event subscriptions.",
  },
  inputs: listSubscriptionsInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(ENS_SUBSCRIPTIONS_PATH);

    return { data };
  },
});
