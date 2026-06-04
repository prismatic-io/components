import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getListMembersExamplePayload } from "../../examplePayloads";
import { connectionInput, getlistId } from "../../inputs";

const listId = getlistId(true, "List ID");

export const getListMembers = action({
  display: {
    label: "Get List Members",
    description: "List the people who have access to a list.",
  },
  examplePayload: getListMembersExamplePayload,
  perform: async (context, { clickUpConnection, listId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/list/${listId}/member`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    listId,
  },
});
