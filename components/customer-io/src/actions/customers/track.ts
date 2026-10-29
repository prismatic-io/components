import { action } from "@prismatic-io/spectral";
import { trackInputs } from "../../inputs";
import { createCustomerClient } from "../../client";
import { trackExamplePayload } from "../../examplePayloads";

export const track = action({
  display: {
    label: "Track",
    description: "Track customer events.",
  },
  perform: async (
    context,
    { id, region, eventData, eventName, cioConnection },
  ) => {
    const client = createCustomerClient(cioConnection, region);
    const payload = eventData
      ? {
          name: eventName,
          data: eventData,
        }
      : {
          name: eventName,
        };

    return {
      data: await client.track(id, payload),
    };
  },
  inputs: trackInputs,
  examplePayload: trackExamplePayload,
});

export default track;
