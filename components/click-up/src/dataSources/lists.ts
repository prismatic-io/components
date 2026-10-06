import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { listsExamplePayload } from "../examplePayloads";
import { listsInputs } from "../inputs";
import type { GetListsResponse } from "../types";
export const lists = dataSource({
  display: {
    label: "Select List",
    description: "Select an available list in a given folder.",
  },
  perform: async (_context, { folderId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetListsResponse>(
      `/folder/${folderId}/list`,
    );
    const options = data.lists.map<Element>((list) => {
      return { label: list.name, key: list.id };
    });
    return { result: options };
  },
  inputs: listsInputs,
  examplePayload: listsExamplePayload,
  dataSourceType: "picklist",
});
