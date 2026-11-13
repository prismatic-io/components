import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { listUsersExamplePayload } from "../examplePayloads";
import { listUsersInputs } from "../inputs";
import { fetchAllPages } from "../util";

export const listUsers = dataSource({
  display: {
    label: "List Users from Source",
    description: "Lists available users for an account.",
  },
  inputs: listUsersInputs,
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const users = await fetchAllPages<Record<string, unknown>>(
      client,
      "/users",
    );

    return {
      result: users
        .map((record) => {
          if (record.mail) {
            return {
              label: record.mail,
              key: record.id,
            };
          }
          return null;
        })
        .filter(Boolean) as Element[],
    };
  },
  examplePayload: listUsersExamplePayload,
  dataSourceType: "picklist",
});
