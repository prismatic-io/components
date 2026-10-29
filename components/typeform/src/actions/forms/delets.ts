import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId } from "../../inputs";
import { genericDeleteResponse } from "../../examplePayloads/general";
import { DELETED_RESOURCE } from "../../constants";

export const deleteForm = action({
  display: {
    label: "Delete Form",
    description: "Delete a form.",
  },
  inputs: {
    id: formId,
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/forms/${id}`);
    return {
      data: {
        message: DELETED_RESOURCE,
      },
    };
  },
  examplePayload: {
    data: genericDeleteResponse,
  },
});
