import { action, outputSchema } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { getMondayClient } from "../../client";
import { archiveBoardExamplePayload } from "../../examplePayloads";
import { archiveBoardInputs } from "../../inputs";
import { archiveBoardOutputSchema } from "../../outputSchemas";
export const archiveBoard = action({
  display: {
    label: "Archive Board",
    description: "Archives a board by ID.",
  },
  inputs: archiveBoardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: archiveBoardOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = getMondayClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      mutation ($board_id: ID!) {
        archive_board(board_id: $board_id) {
          id
        }
      }
    `;
    const variables = { board_id: params.boardId };
    const data = await client.request(query, variables);
    return { data };
  },
  examplePerform: async () => archiveBoardExamplePayload,
  examplePayload: archiveBoardExamplePayload,
});
