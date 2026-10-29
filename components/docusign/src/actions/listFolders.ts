import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { paginateResults } from "../helpers/pagination";
import {
  connection,
  count,
  fetchAll,
  include,
  includeItems,
  startPosition,
  subFolderDepth,
  userFilter,
} from "../inputs";

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Returns a list of the account's folders.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      count,
      include,
      includeItems,
      startPosition,
      subFolderDepth,
      userFilter,
    },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    return await paginateResults({
      client,
      endpoint: "/folders",
      params: {
        include: include || undefined,
        include_items: includeItems,
        sub_folder_depth: subFolderDepth || undefined,
        user_filter: userFilter || undefined,
      },
      fetchAll,
      count,
      startPosition,
      itemsKey: "folders",
    });
  },
  inputs: {
    connection,
    fetchAll,
    count,
    include,
    includeItems,
    startPosition,
    subFolderDepth,
    userFilter,
  },
});
