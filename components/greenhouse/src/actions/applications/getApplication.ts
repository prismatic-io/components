import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getApplicationExamplePayload } from "../../examplePayloads";
import { application_id, connectionInput, version } from "../../inputs";

export const getApplication = action({
  display: {
    label: "Get Application",
    description: "Retrieves an application by ID.",
  },
  perform: async (context, { connection, version, application_id }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const { data } = await client.get(`/applications/${application_id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    application_id: { ...application_id, required: true },
  },
  examplePayload: getApplicationExamplePayload,
});
