import { action, outputSchema } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { getMondayClient } from "../../client";
import { createBoardExamplePayload } from "../../examplePayloads";
import { createBoardInputs } from "../../inputs";
import { createBoardOutputSchema } from "../../outputSchemas";
export const createBoard = action({
  display: {
    label: "Create Board",
    description: "Creates a new board in Monday.",
  },
  inputs: createBoardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBoardOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = getMondayClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      mutation (
        $board_name: String!
        $board_kind: BoardKind!
        $folder_id: ID
        $workspace_id: ID
        $template_id: ID
      ) {
        create_board(
          board_name: $board_name
          board_kind: $board_kind
          folder_id: $folder_id
          workspace_id: $workspace_id
          template_id: $template_id
        ) {
          id
        }
      }
    `;
    const variables = {
      board_name: params.boardName,
      board_kind: params.boardKind,
      folder_id: params.folderId,
      workspace_id: params.workspaceId,
      template_id: params.templateId,
    };
    const data = await client.request(query, variables);
    return { data };
  },
  examplePerform: async () => createBoardExamplePayload,
  examplePayload: createBoardExamplePayload,
});
