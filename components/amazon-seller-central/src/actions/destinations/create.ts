import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDestinationExamplePayload } from "../../examplePayloads/notifications";
import {
  accountId,
  arn,
  awsRegion,
  connectionInput,
  destinationName,
} from "../../inputs";

export const createDestination = action({
  display: {
    label: "Create Destination",
    description: "Creates a destination resource to receive notifications.",
  },
  examplePayload: createDestinationExamplePayload,
  inputs: {
    connectionInput,
    name: destinationName,
    arn,
    region: { ...awsRegion, required: false },
    accountId,
  },
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
});
