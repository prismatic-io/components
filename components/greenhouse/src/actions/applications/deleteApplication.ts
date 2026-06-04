import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteApplicationExamplePayload } from "../../examplePayloads";
import {
  application_id,
  connectionInput,
  on_behalf_of_user_id,
  version,
} from "../../inputs";

export const deleteApplication = action({
  display: {
    label: "Delete Application",
    description: "Deletes an application by ID.",
  },
  perform: async (
    context,
    { connection, version, application_id, user_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const { data } = await client.delete(`/applications/${application_id}`, {
      headers: {
        "On-Behalf-Of": user_id,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    application_id,
    user_id: on_behalf_of_user_id,
  },
  examplePayload: deleteApplicationExamplePayload,
});
