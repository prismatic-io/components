import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserExamplePayload } from "../examplePayloads";
import { selectUserInputs } from "../inputs";
import { getPaginatedData, sortArray } from "../utils";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";
import type { NotionUser } from "../types";
export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a Notion user from a picklist.",
  },
  inputs: selectUserInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await getPaginatedData(
      client,
      HttpMethod.GET,
      "/users",
      true,
      undefined,
      {
        page_size: MAX_PAGE_SIZE,
      },
    );
    const result = sortArray(
      data.results.map((user: NotionUser) => ({
        label: user.name || "Unnamed User",
        key: user.id,
      })),
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectUserExamplePayload,
});
