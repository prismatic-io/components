import { action } from "@prismatic-io/spectral";
import { createOpsEventsClient } from "../../client";
import { addIntegrationAlertNoteExamplePayload } from "../../examplePayloads";
import { addIntegrationAlertNoteInputs } from "../../inputs";

export const addIntegrationAlertNote = action({
  display: {
    label: "Add Integration Alert Note",
    description:
      "Adds a note to an alert via the integration API. Returns an asynchronous request ID.",
  },
  inputs: addIntegrationAlertNoteInputs,
  perform: async (
    context,
    {
      connection,
      alertIdentifier,
      alertIdentifierType,
      alertNote,
      alertUser,
      alertSource,
    },
  ) => {
    const { client } = createOpsEventsClient(connection, context.debug.enabled);
    const body = {
      note: alertNote,
      user: alertUser,
      source: alertSource,
    };

    const { data } = await client.post(
      `/alerts/${encodeURIComponent(alertIdentifier)}/notes`,
      body,
      { params: { identifierType: alertIdentifierType } },
    );
    return { data };
  },
  examplePayload: addIntegrationAlertNoteExamplePayload,
});
