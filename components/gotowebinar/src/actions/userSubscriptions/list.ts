import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { LIST_USER_SUBSCRIPTIONS_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { listUserSubscriptionsInputs } from "../../inputs/subscriptions/listUserSubscriptionsInputs";

export const listUserSubscriptions = action({
  display: {
    label: "List User Subscriptions",
    description: "Retrieve a list of user subscriptions.",
  },
  inputs: listUserSubscriptionsInputs,
  examplePayload: LIST_USER_SUBSCRIPTIONS_EXAMPLE_PAYLOAD,
  perform: async ({ debug: { enabled: debug } }, { connection }) => {
    const { client } = createGotoWebinarClient(connection, debug);
    const url = `/userSubscriptions`;
    const { data } = await client.get(url, {
      params: {
        product: "g2w",
      },
    });

    return {
      data,
    };
  },
});
