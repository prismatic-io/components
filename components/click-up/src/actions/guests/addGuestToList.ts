import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addGuestToListExamplePayload } from "../../examplePayloads";
import { addGuestToListInputs } from "../../inputs";
import { addGuestToListOutputSchema } from "../../outputSchemas";
import type {
  AddGuestToListBody,
  AddGuestToListQueryParams,
} from "../../types";
export const addGuestToList = action({
  display: {
    label: "Add Guest to List",
    description: "Share a list with a guest.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addGuestToListOutputSchema,
  }),
  examplePayload: addGuestToListExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { clickUpConnection, listId, guestId, includeShared, permissionLevel },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body: AddGuestToListBody = {
      permission_level: permissionLevel,
    };
    const params: AddGuestToListQueryParams = {
      include_shared: includeShared,
    };
    const { data } = await client.post(
      `/list/${listId}/guest/${guestId}`,
      body,
      { params },
    );
    return {
      data,
    };
  },
  examplePerform: async () => addGuestToListExamplePayload,
  inputs: addGuestToListInputs,
});
