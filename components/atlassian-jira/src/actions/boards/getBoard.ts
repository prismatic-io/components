import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getBoardExamplePayload } from "../../examplePayloads";
import { getBoardInputs } from "../../inputs";
import { getBoardOutputSchema } from "../../outputSchemas";

export const getBoard = action({
  display: {
    label: "Get Board",
    description: "Get the information and metadata of a board by ID.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createClient(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/board/${params.boardId}`);
    return { data };
  },
  inputs: getBoardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBoardOutputSchema,
  }),
  examplePayload: getBoardExamplePayload,
});
