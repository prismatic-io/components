import { action } from "@prismatic-io/spectral";
import type { Subscription } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { createMailFolderSubscriptionExamplePayload } from "../../examplePayloads";
import { createMailFolderSubscriptionInputs } from "../../inputs";
import { fetchAllData } from "../../util";

export const createMailFolderSubscription = action({
  display: {
    label: "Create Mail Folder Subscription",
    description: "Creates a mail folder subscription for Microsoft Outlook.",
  },
  inputs: createMailFolderSubscriptionInputs,
  perform: async (context, { notificationUrl, expirationDateTime, connection, changeType }) => {
    const client = createClient(connection, context.debug.enabled);

    const subscriptionsData = await fetchAllData<Subscription>(client, "/subscriptions", true, {});
    const [existingSubscription] = subscriptionsData.value.filter(
      ({ notificationUrl: notificationUrlFromMicrosoft }) =>
        notificationUrl === notificationUrlFromMicrosoft,
    );

    if (existingSubscription) {
      context.logger.warn(
        "A webhook with the specified Notification URL already exists. Skipping webhook creation and returning existing webhook.",
      );
      return { data: existingSubscription };
    }

    context.logger.info("A subscription for Mail Folders does not exist, creating one.");
    const { data } = await client.post("/subscriptions", {
      resource: "me/mailFolders('Inbox')/messages",
      changeType,
      notificationUrl,
      expirationDateTime,
    });
    return { data };
  },
  examplePayload: createMailFolderSubscriptionExamplePayload,
});
