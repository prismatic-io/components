import { dataSource } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectUsersInputs } from "../inputs";

export const selectUsers = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select User",
    description: "A picklist of users in the ShipStation account.",
  },
  inputs: selectUsersInputs,
  perform: async (_context, { connectionInput, showInactiveUsersInput }) => {
    const client = createShipStationClient(connectionInput);

    const params = {
      showInactive: showInactiveUsersInput,
    };

    const { data } = await client.get("/users", { params });

    return {
      result: data.map((user: { userId: string; userName: string }) => ({
        key: user.userId,
        label: user.userName,
      })),
    };
  },
});
