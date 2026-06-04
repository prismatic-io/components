import { action } from "@prismatic-io/spectral";
import { createOpsEventsClient } from "../../client";
import { createIntegrationAlertExamplePayload } from "../../examplePayloads";
import { createIntegrationAlertInputs } from "../../inputs";

export const createIntegrationAlert = action({
  display: {
    label: "Create Integration Alert",
    description:
      "Ingests a new alert into JSM Ops via the integration API. Returns an asynchronous request ID; use Get Integration Alert Request to check processing status.",
  },
  inputs: createIntegrationAlertInputs,
  perform: async (
    context,
    {
      connection,
      alertMessage,
      alertAlias,
      alertDescription,
      alertResponders,
      alertVisibleTo,
      alertActions,
      alertTags,
      alertDetails,
      alertEntity,
      alertSource,
      alertPriority,
      alertUser,
      alertNote,
    },
  ) => {
    const { client } = createOpsEventsClient(connection, context.debug.enabled);
    const body = {
      message: alertMessage,
      alias: alertAlias,
      description: alertDescription,
      entity: alertEntity,
      source: alertSource,
      priority: alertPriority,
      user: alertUser,
      note: alertNote,
      responders: alertResponders,
      visibleTo: alertVisibleTo,
      actions: alertActions,
      tags: alertTags,
      details: alertDetails,
    };

    const { data } = await client.post("/alerts", body);
    return { data };
  },
  examplePayload: createIntegrationAlertExamplePayload,
});
