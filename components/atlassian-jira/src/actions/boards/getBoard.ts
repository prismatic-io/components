import { action } from "@prismatic-io/spectral";
import { createClient } from "../../connections/auth";
import { getBoardExamplePayload } from "../../examplePayloads";
import { boardId, connectionInput } from "../../inputs";

export const getBoard = action({
  display: {
    label: "Get Board",
    description: "Get the information and metadata of a board by ID.",
  },
  perform: async (context, params) => {
    const client = await createClient(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/board/${params.boardId}`);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    boardId,
  },
  examplePayload: getBoardExamplePayload,
});
