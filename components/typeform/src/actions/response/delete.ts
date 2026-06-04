import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId, includedResponseIds } from "../../inputs";
import { genericDeleteResponse } from "../../examplePayloads/general";
import { DELETED_RESOURCE } from "../../constants";

export const deleteResponses = action({
  display: {
    label: "Delete Response",
    description: "Delete responses to a form.",
  },
  inputs: {
    id: formId,
    includedResponseIds,
    connection,
  },
  perform: async (context, { connection, id, includedResponseIds }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/forms/${id}`, {
      data: {
        included_response_ids: includedResponseIds.split(","),
      },
      params: {
        include_response_ids: includedResponseIds,
      },
    });
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
