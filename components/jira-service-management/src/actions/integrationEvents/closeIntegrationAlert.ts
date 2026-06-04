import { action } from "@prismatic-io/spectral";
import { createOpsEventsClient } from "../../client";
import { closeIntegrationAlertExamplePayload } from "../../examplePayloads";
import { closeIntegrationAlertInputs } from "../../inputs";

export const closeIntegrationAlert = action({
  display: {
    label: "Close Integration Alert",
    description:
      "Closes (resolves) an alert via the integration API. Returns an asynchronous request ID.",
  },
  inputs: closeIntegrationAlertInputs,
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
      `/alerts/${encodeURIComponent(alertIdentifier)}/close`,
      body,
      { params: { identifierType: alertIdentifierType } },
    );
    return { data };
  },
  examplePayload: closeIntegrationAlertExamplePayload,
});
