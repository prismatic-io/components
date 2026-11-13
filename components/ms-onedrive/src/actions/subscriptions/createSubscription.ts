import { action, outputSchema } from "@prismatic-io/spectral";
import { createSubscriptionFN } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscriptionInputs } from "../../inputs";
import { createSubscriptionOutputSchema } from "../../outputSchemas";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description:
      "Creates a subscription to receive notifications about changes to a resource.",
  },
  inputs: createSubscriptionInputs,
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { changeType, notificationUrl, resource, expirationDateTime, clientState },
  ) => {
    const { clientState: _example, ...subscription } =
      createSubscriptionExamplePayload.data;
    return {
      data: {
        ...subscription,
        resource,
        changeType,
        notificationUrl,
        expirationDateTime,
        ...(clientState ? { clientState } : {}),
      },
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSubscriptionOutputSchema,
  }),
  examplePayload: createSubscriptionExamplePayload,
});
