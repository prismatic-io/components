import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { getMondayClient } from "../../client";
import { MAX_LIMIT } from "../../constants";
import { getItemsByColumnValueNewExamplePayload } from "../../examplePayloads";
import { getItemsByColumnValueNewInputs } from "../../inputs";

export const getItemsByColumnValueNew = action({
  display: {
    label: "Get Items By Column Value",
    description: "Fetches items that have a certain column value.",
  },
  inputs: getItemsByColumnValueNewInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);

    const ITEMS_PAGE = {
      arguments:
        "$boardId: ID!, $limit: Int, $columns: [ItemsPageByColumnValuesQuery!]",
      action: `items_page_by_column_values(
          limit: $limit
          board_id: $boardId
          columns: $columns
        )`,
    };

    const NEXT_ITEMS_PAGE = {
      arguments: "$cursor: String!, $limit: Int",
      action: "next_items_page(cursor: $cursor, limit: $limit)",
    };

    const query = gql`
      query(
        <QUERY_ARGUMENTS>
      ) {
        <QUERY_ACTION> {
          cursor
          items {
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
              column {
                description
                title
              }
              type
              value
            }
          }
        }
      }
    `;
    let data = null;
    let cursor = null;
    const items = [];
    do {
      let toExecuteQuery = query;
      const variables: Record<string, unknown> = {
        limit: MAX_LIMIT,
      };

      
      if (!data && !cursor) {
        variables.boardId = params.boardId;

        variables.columns = [
          {
            column_id: params.columnId,
            column_values: [params.columnValue],
          },
        ];

        toExecuteQuery = query.replace("<QUERY_ACTION>", ITEMS_PAGE.action);
        toExecuteQuery = toExecuteQuery.replace(
          "<QUERY_ARGUMENTS>",
          ITEMS_PAGE.arguments,
        );
      }

      
      if (cursor && params.getAllItems) {
        variables.cursor = cursor;

        toExecuteQuery = query.replace(
          "<QUERY_ACTION>",
          NEXT_ITEMS_PAGE.action,
        );
        toExecuteQuery = toExecuteQuery.replace(
          "<QUERY_ARGUMENTS>",
          NEXT_ITEMS_PAGE.arguments,
        );
      }

      data = await client.request(toExecuteQuery, variables);

      
      if (data.items_page_by_column_values) {
        cursor = data.items_page_by_column_values.cursor;
        items.push(...data.items_page_by_column_values.items);
      }
      
      else if (data.next_items_page) {
        cursor = data.next_items_page.cursor;
        items.push(...data.next_items_page.items);
      } else cursor = null;
    } while (params.getAllItems && cursor);

    return { data: { items_by_column_values: items } };
  },
  examplePayload: getItemsByColumnValueNewExamplePayload,
});
