import { dataSource, type Element } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { usersV3DataSourceExamplePayload } from "../../examplePayloads/v3/dataSources";
import { connectionOnlyInputs } from "../../inputs/v3/common";
import type { V3User } from "../../types";
import { fetchAllV3 } from "../../util/v3";

export const usersV3 = dataSource({
  display: {
    label: "Fetch User Names",
    description: "Fetches an array of user names.",
  },
  inputs: connectionOnlyInputs,
  perform: async (_context, { connection }) => {
    const client = createV3Client(connection);
    const data = await fetchAllV3<V3User>(client, "/users");
    const result = data.map<Element>((user) => ({
      label: user.name,
      key: user.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: usersV3DataSourceExamplePayload,
});
