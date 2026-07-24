import { getPubSubNotificationMerchant } from "./getPubSubNotification";
import { updatePubSubNotificationMerchant } from "./updatePubSubNotification";
export default {
  listNotificationSubscriptionsMerchant: getPubSubNotificationMerchant,
  createNotificationSubscriptionMerchant: updatePubSubNotificationMerchant,
};
