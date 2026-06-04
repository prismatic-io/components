import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { getMondayClient } from "../../client";
import { getItemsByColumnValueExamplePayload } from "../../examplePayloads";
import { getItemsByColumnValueInputs } from "../../inputs";

export const getItemsByColumnValue = action({
  display: {
    label: "Get Items By Column Value (Deprecated)",
    description:
      "Fetches items that have a certain column value. This version of the action is deprecated. Please use Get Items By Column Value instead.",
  },
  inputs: getItemsByColumnValueInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);
    
    const query = gql`
      query ($boardId: Int!, $columnId: String!, $columnValue: String!) {
        items_by_column_values(
          board_id: $boardId
          column_id: $columnId
          column_value: $columnValue
        ) {
          id
          name
          creator {
            email
          }
          updated_at
          state
          column_values {
            id
            text
            description
            title
            type
            value
          }
        }
      }
    `;

    const variables = {
      boardId: params.boardId,
      columnId: params.columnId,
      columnValue: params.columnValue,
    };

    try {
      const data = await client.request(query, variables);
      return { data };
    } catch (error) {
      const stringError = JSON.stringify(error);
      if (
        stringError.includes(
          "Field 'items_by_column_values' doesn't exist on type 'Query'",
        )
      ) {
        throw new Error(
          "This action is deprecated. Please replace action with Get Items By Column Value.",
        );
      }
      throw error;
    }
  },
  examplePayload: getItemsByColumnValueExamplePayload,
});
