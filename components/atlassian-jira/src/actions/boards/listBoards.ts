import { action } from "@prismatic-io/spectral";
import { createClient } from "../../connections/auth";
import { listBoardsExamplePayload } from "../../examplePayloads";
import { connectionInput, filter, maxResults, startAt } from "../../inputs";

export const listBoards = action({
  display: {
    label: "List Boards",
    description: "Retrieve a list of existing boards.",
  },
  perform: async (context, { jiraConnection, startAt, maxResults, filter }) => {
    const client = await createClient(jiraConnection, context.debug.enabled);
    const { data } = await client.get("/board", {
      params: {
        startAt: startAt || undefined,
        maxResults: maxResults || undefined,
        filter: filter || undefined,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    startAt,
    maxResults,
    filter,
  },
  examplePayload: listBoardsExamplePayload,
});
