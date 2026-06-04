import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";
import type { UserDataSources } from "../types";

export const usersNames = dataSource({
  display: {
    label: "Fetch User Names",
    description: "Fetches an array of user names.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<UserDataSources[]>("/users");
    const result = data.map<Element>((user) => ({
      label: user.name,
      key: user.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Juliet Burke", key: "112" },
      { label: "John Doe", key: "712" },
    ],
  },
});

export const users = dataSource({
  display: {
    label: "Fetch User Emails",
    description: "Fetches an array of user emails.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<UserDataSources[]>("/users");
    const result = data.map<Element>((user) => ({
      label: user.primary_email_address,
      key: user.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Juliet@Burke.com", key: "112" },
      { label: "John@Doe.com", key: "712" },
    ],
  },
});
