import { action, util } from "@prismatic-io/spectral";
import { id, eventData, region, eventName, connectionInput } from "../inputs";
import { createCustomerClient } from "../client";
import { trackExamplePayload } from "../examplePayloads";

export const track = action({
  display: {
    label: "Track",
    description: "Track customer events",
  },
  perform: async (
    context,
    { id, region, eventData, eventName, cioConnection }
  ) => {
    const client = createCustomerClient(cioConnection, region);
    const payload = eventData
      ? {
          name: eventName,
          data: util.types.keyValPairListToObject(eventData),
        }
      : {
          name: eventName,
        };

    return {
      data: await client.track(util.types.toString(id), payload),
    };
  },
  inputs: { id, region, eventData, eventName, cioConnection: connectionInput },
  examplePayload: trackExamplePayload,
});

export default track;
