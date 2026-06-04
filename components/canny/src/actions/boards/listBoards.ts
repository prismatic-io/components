import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBoardsExamplePayload } from "../../examplePayloads";
import { listBoardsInputs } from "../../inputs";

export const listBoards = action({
  display: {
    label: "List Boards",
    description: "Lists all boards.",
  },
  inputs: listBoardsInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/boards/list");
    return { data };
  },
  examplePayload: listBoardsExamplePayload,
});
