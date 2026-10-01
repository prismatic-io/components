import { action, outputSchema } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { getMondayClient } from "../../client";
import { getBoardExamplePayload } from "../../examplePayloads";
import { getBoardInputs } from "../../inputs";
import { getBoardOutputSchema } from "../../outputSchemas";
export const getBoard = action({
  display: {
    label: "Get Board",
    description: "Gets the information and metadata of a board by ID.",
  },
  inputs: getBoardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBoardOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, params) => {
    const client = getMondayClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      query ($boardId: [ID!]) {
        boards(ids: $boardId) {
          id
          name
          state
          board_folder_id
          columns {
            title
            type
          }
          creator {
            id
          }
        }
      }
    `;
    const variables = { boardId: [params.boardId] };
    const data = await client.request(query, variables);
    return { data };
  },
  examplePayload: getBoardExamplePayload,
});
