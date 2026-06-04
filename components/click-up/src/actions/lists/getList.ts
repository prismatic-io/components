import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getListExamplePayload } from "../../examplePayloads";
import { connectionInput, getlistId } from "../../inputs";

const listId = getlistId(true, "List ID");

export const getList = action({
  display: {
    label: "Get List",
    description: "Retrieve details for a specific list.",
  },
  examplePayload: getListExamplePayload,
  perform: async (context, { clickUpConnection, listId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/list/${listId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    listId,
  },
});
