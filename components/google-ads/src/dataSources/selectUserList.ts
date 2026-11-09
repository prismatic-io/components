import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createDataManagerClient } from "../client";
import { selectUserListDataSourceExamplePayload } from "../examplePayloads";
import { selectUserListInputs } from "../inputs";
import { listAllUserLists } from "../util";

export const selectUserList = dataSource({
  display: {
    label: "Select Audience",
    description:
      "Select a Customer Match audience of a Google Ads customer that members can be uploaded to.",
  },
  inputs: selectUserListInputs,
  perform: async (context, { connection, customerId, managerCustomerId }) => {
    const client = createDataManagerClient({
      connection,
      debugEnabled: false,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const userLists = await listAllUserLists(client, customerId);

    const result = userLists
      .filter(
        (list) =>
          list.ingestedUserListInfo !== undefined && list.readOnly !== true,
      )
      .map<Element>((list) => ({
        label:
          list.displayName === undefined
            ? list.id
            : `${list.displayName} - ${list.id}`,
        key: list.id,
      }))
      .sort((a, b) =>
        util.types
          .toString(a.label)
          .localeCompare(util.types.toString(b.label)),
      );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectUserListDataSourceExamplePayload,
});
