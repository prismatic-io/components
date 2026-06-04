import { connection } from "../general";
import { input, util } from "@prismatic-io/spectral";

export const userSubscriptionKeys = input({
  label: "User Subscription Keys",
  comments: "The subscription keys to act upon.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(["subscription_id1", "subscription_id2"], null, 2),
  clean: (value: unknown) => {
    return (util.types.toObject(value) as unknown[]).map((us: unknown) => {
      return util.types.toString(us);
    });
  },
});

export const deleteWebhook = input({
  label: "Delete Webhooks",
  comments:
    "Set to true if you want the affiliated webhook deleted with the" +
    " user subscription. Note, deleting the webhook will " +
    "also delete any other user subscriptions tied to the " +
    "corresponding webhook key.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});

export const deleteUserSubscriptionInputs = {
  connection,
  userSubscriptionKeys,
  deleteWebhook,
};
