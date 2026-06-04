import { dataSource } from "@prismatic-io/spectral";
import { selectUsersInputs } from "../inputs";
import { getAdobeSignClient } from "../client";
import type { UserResponse } from "../types";
import { fetchAdobeSignResults, filterAndSort } from "../util";

export const selectUsers = dataSource({
  display: {
    label: "Select Users",
    description:
      "Retrieves a picklist of all Adobe Acrobat Sign users under this account.",
  },
  dataSourceType: "picklist",
  inputs: selectUsersInputs,
  perform: async (_, { connection, filterQuery }) => {
    const client = getAdobeSignClient(connection);

    const users = await fetchAdobeSignResults<
      UserResponse,
      "userInfoList",
      true
    >(client, "/users", true, undefined, "userInfoList");

    const elements = users.map((user) => ({
      label: `${user.firstName} ${user.lastName} - ${user.email}`,
      key: user.id,
    }));

    return {
      result: filterAndSort(elements, filterQuery),
    };
  },
});
