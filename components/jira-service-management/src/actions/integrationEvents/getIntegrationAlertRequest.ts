import { action } from "@prismatic-io/spectral";
import { createOpsEventsClient } from "../../client";
import { getIntegrationAlertRequestExamplePayload } from "../../examplePayloads";
import { getIntegrationAlertRequestInputs } from "../../inputs";

export const getIntegrationAlertRequest = action({
  display: {
    label: "Get Integration Alert Request",
    description:
      "Returns the processing status of an asynchronous Integration Events request by ID.",
  },
  inputs: getIntegrationAlertRequestInputs,
  perform: async (context, { connection, requestId }) => {
    const { client } = createOpsEventsClient(connection, context.debug.enabled);
    const { data } = await client.get(`/alerts/requests/${requestId}`);
    return { data };
  },
  examplePayload: getIntegrationAlertRequestExamplePayload,
});
