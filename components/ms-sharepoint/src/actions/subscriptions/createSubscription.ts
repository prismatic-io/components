import { action, outputSchema } from "@prismatic-io/spectral";
import { createSubscriptionFN } from "ms-utils";
import { createClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscriptionInputs } from "../../inputs";
import { createSubscriptionOutputSchema } from "../../outputSchemas";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description: "Create a subscription that sends notifications of changes to a resource.",
  },
  inputs: createSubscriptionInputs,
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { changeType, notificationUrl, resource, expirationDateTime, clientState },
  ) => {
    const { clientState: _example, ...subscription } = createSubscriptionExamplePayload.data;
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
