import { createKarbonClient } from "../../client";
import { dataSource, type Element } from "@prismatic-io/spectral";
import type { User } from "../../interfaces/User";
import { connection } from "../../inputs/shared";
import { getPaginatedData } from "../../utils";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a User from a dropdown menu",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createKarbonClient(connection, false);
    const data = await getPaginatedData<User>({
      client,
      endpoint: "/v3/Users",
      getAllData: true,
      pagination: {},
    });
    const users = data.value || [];
    const objects = users.map<Element>((user) => ({
      key: user.Id,
      label: `${user.Name} ${user.EmailAddress}`,
    }));

    return { result: objects };
  },
});
