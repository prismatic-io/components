import { action, util } from "@prismatic-io/spectral";
import { id, url, region, connectionInput } from "../inputs";
import { createCustomerClient } from "../client";
import { trackPageViewExamplePayload } from "../examplePayloads";

export const trackPageView = action({
  display: {
    label: "Track Page View",
    description: "Track customer history",
  },
  perform: async (context, { id, region, url, cioConnection }) => {
    const client = createCustomerClient(cioConnection, region);

    return {
      data: await client.trackPageView(
        util.types.toString(id),
        util.types.toString(url)
      ),
    };
  },
  inputs: { id, region, url, cioConnection: connectionInput },
  examplePayload: trackPageViewExamplePayload,
});

export default trackPageView;
