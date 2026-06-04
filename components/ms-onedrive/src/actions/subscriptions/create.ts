import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import {
  allowDuplicates,
  oneDriveConnection,
  changeType,
  notificationUrl,
  resource,
  expirationDateTime,
  clientState,
} from "../../inputs";
import { createSubscriptionFN } from "ms-utils";
import { createSubscriptionExamplePayload } from "../../examplePayloads";

export const createSubscription = action({
  display: {
    label: "Create a Subscription",
    description: "Create a Subscription to notify you of changes to a resource",
  },
  inputs: {
    oneDriveConnection,
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
      oneDriveConnection,
      changeType,
      notificationUrl,
      resource,
      expirationDateTime,
      clientState,
      allowDuplicates,
    },
  ) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
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
  examplePayload: createSubscriptionExamplePayload,
});
