import { dataSource } from "@prismatic-io/spectral";
import { selectGroupInputs } from "../inputs";
import { getAdobeSignClient } from "../client";
import type { ListGroup } from "../types";
import { fetchAdobeSignResults, filterAndSort } from "../util";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description:
      "Retrieves a picklist of all Adobe Acrobat Sign groups under this account.",
  },
  dataSourceType: "picklist",
  inputs: selectGroupInputs,
  perform: async (_, { connection, filterQuery }) => {
    const client = getAdobeSignClient(connection);

    const groups = await fetchAdobeSignResults<
      ListGroup,
      "groupInfoList",
      true
    >(client, "/groups", true, undefined, "groupInfoList");

    const elements = groups.map((group) => ({
      label: `${group.groupName}`,
      key: group.groupId,
    }));

    return {
      result: filterAndSort(elements, filterQuery),
    };
  },
});
