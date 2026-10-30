import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBoardsExamplePayload } from "../../examplePayloads";
import { listBoardsInputs } from "../../inputs";
import { listBoardsOutputSchema } from "../../outputSchemas";

export const listBoards = action({
  display: {
    label: "List Boards",
    description: "Retrieve a list of existing boards.",
  },
  performSafety: "notAllowed",
  perform: async (context, { jiraConnection, filter, pagination }) => {
    const client = await createClient(jiraConnection, context.debug.enabled);
    const { data } = await client.get("/board", {
      params: {
        startAt: pagination.startAt,
        maxResults: pagination.maxResults,
        filter,
      },
    });
    return { data };
  },
  examplePerform: async () => listBoardsExamplePayload,
  inputs: listBoardsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBoardsOutputSchema,
  }),
  examplePayload: listBoardsExamplePayload,
});
