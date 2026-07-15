import { URL } from "node:url";
import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { API_VERSION, BASE_URL } from "../constants";
import { sendGridListsDataSourceExamplePayload } from "../examplePayloads";
import { sendGridListsDataSourceInputs } from "../inputs";
import type { GetAllListsResponseBody } from "../types";
export const sendGridListsDataSource = dataSource({
  display: {
    label: "Select Contact Lists",
    description: "Fetches a list of contact lists from SendGrid.",
  },
  inputs: sendGridListsDataSourceInputs,
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createAuthorizedClient(connection);
    const allLists: Element[] = [];
    let nextPath = `/${API_VERSION}/marketing/lists?page_size=100`;
    try {
      while (nextPath) {
        const url = new URL(
          nextPath.startsWith("http") ? nextPath : `${BASE_URL}${nextPath}`,
        );
        const path = url.pathname;
        const queryParams = Object.fromEntries(url.searchParams);
        const [_response, body] = await client.request({
          method: "GET",
          url: path,
          qs: queryParams,
        });
        const typedBody = body as GetAllListsResponseBody;
        if (typedBody?.result) {
          const lists = typedBody.result.map<Element>((list) => ({
            label: `${list.name} (${list.contact_count} contacts)`,
            key: list.id,
          }));
          allLists.push(...lists);
        }
        nextPath = typedBody?._metadata?.next || "";
      }
      return { result: allLists };
    } catch (error) {
      context.logger.error(
        `Failed to fetch SendGrid lists for data source: ${util.types.toString(error)}`,
      );
      return {
        result: [
          {
            label: "Error fetching lists. Check logs.",
            key: "ERROR",
          },
        ],
      };
    }
  },
  examplePayload: sendGridListsDataSourceExamplePayload,
});
