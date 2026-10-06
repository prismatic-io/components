import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { spacesExamplePayload } from "../examplePayloads";
import { spacesInputs } from "../inputs";
import type { GetSpacesResponse } from "../types";
export const spaces = dataSource({
  display: {
    label: "Select Space",
    description: "Select a space available in a workspace.",
  },
  perform: async (_context, { connection, teamId }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetSpacesResponse>(
      `/team/${teamId}/space`,
    );
    const options = data.spaces.map<Element>((space) => {
      return { label: space.name, key: space.id };
    });
    return { result: options };
  },
  inputs: spacesInputs,
  examplePayload: spacesExamplePayload,
  dataSourceType: "picklist",
});
