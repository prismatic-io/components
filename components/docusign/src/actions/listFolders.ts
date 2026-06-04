import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  connection,
  count,
  include,
  includeItems,
  startPosition,
  subFolderDepth,
  userFilter,
} from "../inputs";
import { getFolders } from "../utils";

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Returns a list of the account's folders.",
  },
  perform: async (
    context,
    {
      connection,
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
    const data = await getFolders(
      client,
      count,
      include,
      includeItems,
      startPosition,
      subFolderDepth,
      userFilter,
    );
    return { data };
  },
  inputs: {
    connection,
    count,
    include,
    includeItems,
    startPosition,
    subFolderDepth,
    userFilter,
  },
});
