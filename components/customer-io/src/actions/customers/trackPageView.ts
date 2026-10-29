import { action } from "@prismatic-io/spectral";
import { trackPageViewInputs } from "../../inputs";
import { createCustomerClient } from "../../client";
import { trackPageViewExamplePayload } from "../../examplePayloads";

export const trackPageView = action({
  display: {
    label: "Track Page View",
    description: "Track a customer page view.",
  },
  perform: async (context, { id, region, url, cioConnection }) => {
    const client = createCustomerClient(cioConnection, region);

    return {
      data: await client.trackPageView(id, url),
    };
  },
  inputs: trackPageViewInputs,
  examplePayload: trackPageViewExamplePayload,
});

export default trackPageView;
