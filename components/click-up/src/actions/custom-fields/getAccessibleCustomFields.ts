import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getAccessibleCustomFieldsExamplePayload } from "../../examplePayloads";
import { connectionInput, getlistId } from "../../inputs";

const listId = getlistId(true);

export const getAccessibleCustomFields = action({
  display: {
    label: "Get Accessible Custom Fields",
    description: "List the custom fields available on tasks in a specific list.",
  },
  examplePayload: getAccessibleCustomFieldsExamplePayload,
  perform: async (context, { connection, listId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);

    const { data } = await client.get(`/list/${listId}/field`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    listId,
  },
});
