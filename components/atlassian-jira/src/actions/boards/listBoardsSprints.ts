import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBoardsSprintsExamplePayload } from "../../examplePayloads";
import { listBoardsSprintsInputs } from "../../inputs";
import { listBoardsSprintsOutputSchema } from "../../outputSchemas";

export const listBoardsSprints = action({
  display: {
    label: "List Board Sprints",
    description: "List all sprints within a board.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createClient(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/board/${params.boardId}/sprint`, {
      params: {
        boardId: params.boardId,
        startAt: params.pagination.startAt,
        maxResults: params.pagination.maxResults,
      },
    });
    return { data };
  },
  examplePerform: async () => listBoardsSprintsExamplePayload,
  inputs: listBoardsSprintsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBoardsSprintsOutputSchema,
  }),
  examplePayload: listBoardsSprintsExamplePayload,
});
