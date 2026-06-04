import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserInputs } from "../inputs";
import { getPaginatedData, sortArray } from "../util";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";

interface NotionUser {
  id: string;
  name?: string;
  type?: string;
}

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
  examplePayload: {
    result: [
      { label: "John Doe", key: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b" },
      { label: "Integration Bot", key: "ee5f0f84-409a-440f-983a-a5315961c6e4" },
    ],
  },
});
