import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDestinationExamplePayload } from "../../examplePayloads/notifications";
import { createDestinationInputs } from "../../inputs";
import { createDestinationOutputSchema } from "../../outputSchemas";

export const createDestination = action({
  display: {
    label: "Create Destination",
    description: "Creates a destination resource to receive notifications.",
  },
  examplePayload: createDestinationExamplePayload,
  inputs: createDestinationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDestinationOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    { connectionInput, name, arn, region, accountId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/notifications/v1/destinations", {
      name: name || undefined,
      resourceSpecification: {
        sqs: {
          arn: arn || undefined,
        },
        eventBridge: {
          region: region || undefined,
          accountId: accountId || undefined,
        },
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => createDestinationExamplePayload,
});
