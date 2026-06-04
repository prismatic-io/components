import { action, util } from "@prismatic-io/spectral";
import { deleteInstancedWebhooksInputs } from "../../inputs/webhooks/deleteInstancedWebhooksInputs";
import { createGotoWebinarClient } from "../../client";
import { GENERAL_DELETE_MESSAGE } from "../../constants";
import { deleteInstancedWebhooks } from "../../utils";

export const deleteInstancedWebhooksAction = action({
  display: {
    label: "Delete Instanced Subscriptions",
    description:
      "Deletes all subscriptions that point to a flow in this instance",
  },
  inputs: deleteInstancedWebhooksInputs,
  examplePayload: GENERAL_DELETE_MESSAGE,
  perform: async (
    { debug: { enabled: debug }, webhookUrls },
    { connection },
  ) => {
    const { client } = createGotoWebinarClient(connection, debug);
    const callbackUrls = Object.values(webhookUrls).map((url) =>
      util.types.toString(url),
    );

    await deleteInstancedWebhooks(client, callbackUrls, {
      product: "g2w",
    });

    return GENERAL_DELETE_MESSAGE;
  },
});
