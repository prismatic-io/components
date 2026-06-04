import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  allowDuplicates,
  connection,
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  clientState,
} from "../../inputs";
import { createSubscriptionFN } from "ms-utils";

export const createSubscription = action({
  display: {
    label: "Create a Subscription",
    description: "Create a Subscription to notify you of changes to a resource",
  },
  inputs: {
    connection,
    changeType,
    notificationUrl,
    resource,
    expirationDateTime,
    clientState,
    allowDuplicates,
  },
  perform: async (
    context,
    {
      connection,
      changeType,
      notificationUrl,
      resource,
      expirationDateTime,
      clientState,
      allowDuplicates,
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await createSubscriptionFN(
      client,
      {
        resource,
        changeType,
        notificationUrl,
        expirationDateTime,
        clientState,
        allowDuplicates,
      },
      context,
    );
    return { data };
  },
  examplePayload: {
    data: {
      id: "38031b7d-16b1-448a-8e68-68b8aec62315",
      resource: "/me/drive/root",
      changeType: "updated",
      clientState: "client-specific-string",
      notificationUrl: "https://hooks.example.com/trigger/SW5z",
      expirationDateTime: "2025-12-12T11:23:00.0000000Z",
      creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
      latestSupportedTlsVersion: "v1_2",
    },
  },
});
