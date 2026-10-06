import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { teamsExamplePayload } from "../examplePayloads";
import { teamsInputs } from "../inputs";
import type { GetAuthorizedTeamsResponse } from "../types";
export const teams = dataSource({
  display: {
    label: "Select Authorized Workspace",
    description: "Select a workspace available to the authenticated user.",
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetAuthorizedTeamsResponse>("/team");
    const options = data.teams.map<Element>((field) => {
      return { label: field.name, key: field.id };
    });
    return { result: options };
  },
  inputs: teamsInputs,
  examplePayload: teamsExamplePayload,
  dataSourceType: "picklist",
});
