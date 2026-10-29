import { action } from "@prismatic-io/spectral";
import { createOpsEventsClient } from "../../client";
import { acknowledgeIntegrationAlertExamplePayload } from "../../examplePayloads";
import { acknowledgeIntegrationAlertInputs } from "../../inputs";

export const acknowledgeIntegrationAlert = action({
  display: {
    label: "Acknowledge Integration Alert",
    description:
      "Acknowledges an alert via the integration API. Returns an asynchronous request ID.",
  },
  inputs: acknowledgeIntegrationAlertInputs,
  perform: async (
    context,
    {
      connection,
      alertIdentifier,
      alertIdentifierType,
      alertUser,
      alertSource,
      alertNote,
    },
  ) => {
    const { client } = createOpsEventsClient(connection, context.debug.enabled);
    const body = {
      user: alertUser,
      source: alertSource,
      note: alertNote,
    };

    const { data } = await client.post(
      `/alerts/${encodeURIComponent(alertIdentifier)}/acknowledge`,
      body,
      { params: { identifierType: alertIdentifierType } },
    );
    return { data };
  },
  examplePayload: acknowledgeIntegrationAlertExamplePayload,
});
