import { action, util } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createPageInputs } from "../../inputs";
import type { CreatePageBody } from "../types/CreatePageBody";
import { createPageExamplePayload } from "../../examplePayloads";

export const createPage = action({
  display: {
    label: "Create Page",
    description: "Creates a new page in a Domo instance.",
  },
  examplePayload: createPageExamplePayload,
  perform: async (
    context,
    { connection, name, parentId, locked, cardIds, userIds, groupIds },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body: CreatePageBody = {
      ...(name.length && { name }),
      ...(parentId.length && { parentId: util.types.toInt(parentId) }),
      ...(locked.length && { locked }),
      ...(cardIds.length && { cardIds }),
      ...((userIds.length || groupIds.length) && {
        visibility: {
          ...(userIds.length && { userIds }),
          ...(groupIds.length && { groupIds }),
        },
      }),
    };
    const { data } = await client.post(`/pages`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: createPageInputs,
});

export default { createPage };
