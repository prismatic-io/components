import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { getMondayClient } from "../../client";
import { archiveBoardExamplePayload } from "../../examplePayloads";
import { archiveBoardInputs } from "../../inputs";

export const archiveBoard = action({
  display: {
    label: "Archive Board",
    description: "Archives a board by ID.",
  },
  inputs: archiveBoardInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);
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
  examplePayload: archiveBoardExamplePayload,
});
