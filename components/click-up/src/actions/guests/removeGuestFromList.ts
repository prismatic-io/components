import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromListExamplePayload } from "../../examplePayloads";
import { removeGuestFromListInputs } from "../../inputs";
import { removeGuestFromListOutputSchema } from "../../outputSchemas";
import type { RemoveGuestFromListQueryParams } from "../../types";
export const removeGuestFromList = action({
  display: {
    label: "Remove Guest from List",
    description: "Revoke a guest's access to a list.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeGuestFromListOutputSchema,
  }),
  examplePayload: removeGuestFromListExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { clickUpConnection, listId, guestId, includeShared },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const params: RemoveGuestFromListQueryParams = {
      include_shared: includeShared,
    };
    const { data } = await client.delete(`/list/${listId}/guest/${guestId}`, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async () => removeGuestFromListExamplePayload,
  inputs: removeGuestFromListInputs,
});
