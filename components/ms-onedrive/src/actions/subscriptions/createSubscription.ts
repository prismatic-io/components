import { action } from "@prismatic-io/spectral";
import { createSubscriptionFN } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscriptionInputs } from "../../inputs";

export const createSubscription = action({
  display: {
    label: "Create a Subscription",
    description: "Create a Subscription to notify you of changes to a resource",
  },
  inputs: createSubscriptionInputs,
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
