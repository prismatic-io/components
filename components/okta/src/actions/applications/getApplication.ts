import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getApplicationExamplePayload } from "../../examplePayloads/applications";
import { getApplicationInputs } from "../../inputs/applications";
import type { Application } from "../../interfaces/application";

export const getApplication = action({
  display: {
    label: "Get Application",
    description: "Retrieve an application by ID.",
  },
  inputs: getApplicationInputs,
  perform: async (context, { connection, applicationId, expand }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<Application>(`/apps/${encodeURIComponent(applicationId)}`, {
      params: { expand },
    });

    return { data };
  },
  examplePayload: getApplicationExamplePayload,
});
