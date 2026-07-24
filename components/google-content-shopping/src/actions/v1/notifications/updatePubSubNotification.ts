import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { updatePubSubNotificationExamplePayload } from "../../../examplePayloads/v1";
import { updatePubSubNotificationInputs } from "../../../inputs/v1/notifications";
import { accountResourceName } from "../../../util/resourceNames";
export const updatePubSubNotificationMerchant = action({
  display: {
    description:
      "Creates a notification subscription for a Merchant Center account.",
    label: "Create Notification Subscription (Merchant v1)",
  },
  inputs: updatePubSubNotificationInputs,
  perform: async (
    context,
    {
      connectionInput,
      account,
      registeredEvent,
      callBackUri,
      targetAccount,
      allManagedAccounts,
    },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const parent = accountResourceName(account);
    const requestBody = {
      registeredEvent,
      callBackUri,
      ...(targetAccount
        ? { targetAccount }
        : { allManagedAccounts: allManagedAccounts ?? true }),
    };
    const { data } = await client.post(
      `/notifications/v1/${parent}/notificationsubscriptions`,
      requestBody,
    );
    return { data };
  },
  examplePayload: updatePubSubNotificationExamplePayload,
});
