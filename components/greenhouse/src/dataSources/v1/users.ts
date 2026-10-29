import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  userEmailsV1DataSourceExamplePayload,
  userNamesV1DataSourceExamplePayload,
} from "../../examplePayloads/v1/dataSources";
import { connectionInput, version } from "../../inputs";
import type { UserDataSources } from "../../types";

export const usersNames = dataSource({
  display: {
    label: "Fetch User Names (Harvest v1/v2)",
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
  examplePayload: userNamesV1DataSourceExamplePayload,
});

export const users = dataSource({
  display: {
    label: "Fetch User Emails (Harvest v1/v2)",
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
  examplePayload: userEmailsV1DataSourceExamplePayload,
});
