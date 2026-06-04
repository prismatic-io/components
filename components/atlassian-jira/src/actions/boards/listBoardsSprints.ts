import { action } from "@prismatic-io/spectral";
import { createClient } from "../../connections/auth";
import { listBoardsSprintsExamplePayload } from "../../examplePayloads";
import { boardId, connectionInput, maxResults, startAt } from "../../inputs";

export const listBoardsSprints = action({
  display: {
    label: "List Board Sprints",
    description: "List all sprints within a board.",
  },
  perform: async (context, params) => {
    const client = await createClient(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/board/${params.boardId}/sprint`, {
      params: {
        boardId: params.boardId || undefined,
        startAt: params.startAt || undefined,
        maxResults: params.maxResults || undefined,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    boardId,
    startAt,
    maxResults,
  },
  examplePayload: listBoardsSprintsExamplePayload,
});
