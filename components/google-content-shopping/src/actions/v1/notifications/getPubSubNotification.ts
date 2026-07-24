import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { getPubSubNotificationExamplePayload } from "../../../examplePayloads/v1";
import { getPubSubNotificationInputs } from "../../../inputs/v1/notifications";
import { fetchAllPages } from "../../../util/pagination";
import { accountResourceName } from "../../../util/resourceNames";
export const getPubSubNotificationMerchant = action({
  display: {
    description:
      "Lists the notification subscriptions for a Merchant Center account.",
    label: "List Notification Subscriptions (Merchant v1)",
  },
  inputs: getPubSubNotificationInputs,
  perform: async (
    context,
    { connectionInput, account, pagination, fetchAll },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const parent = accountResourceName(account);
    const path = `/notifications/v1/${parent}/notificationsubscriptions`;
    if (fetchAll) {
      const notificationSubscriptions = await fetchAllPages(async (token) => {
        const { data } = await client.get(path, {
          params: { pageSize: pagination.pageSize, pageToken: token },
        });
        return {
          items: data.notificationSubscriptions ?? [],
          nextPageToken: data.nextPageToken,
        };
      });
      return { data: { notificationSubscriptions } };
    }
    const { data } = await client.get(path, {
      params: {
        pageSize: pagination.pageSize,
        pageToken: pagination.pageToken,
      },
    });
    return { data };
  },
  examplePayload: getPubSubNotificationExamplePayload,
});
