import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { renderTemplateExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  incidentId,
  templateId,
  updateMessage,
} from "../../inputs";

export const renderTemplate = action({
  display: {
    label: "Render Template",
    description: "Render a template for a given incident.",
  },
  perform: async (context, { connection, id, incidentId, updateMessage }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/templates/${id}/render`, {
      incident_id: incidentId,
      status_update: updateMessage,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    incidentId,
    id: templateId,
    updateMessage,
  },
  examplePayload: renderTemplateExamplePayload,
});
