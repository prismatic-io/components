import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { computeEndpointBasedOnConnection, fetchAllData } from "../util";
import type { Message } from "@microsoft/microsoft-graph-types";
import type { ODataAttrs } from "../types";
import { createClient } from "../client";
import { connectionInput, folderIdInput, searchInput, filterInput } from "../inputs";

export const selectMessage = dataSource({
  display: {
    label: "Select Message",
    description: "Select a message from the list of messages.",
  },
  inputs: {
    connection: connectionInput,
    folderId: { ...folderIdInput, dataSource: undefined },
    search: searchInput,
    filter: filterInput,
  },
  perform: async (context, { connection, folderId, search, filter }) => {
    const client = createClient(connection, false);
    const url = folderId ? `/me/mailFolders/${folderId}/messages` : "/me/messages";
    const { value } = await fetchAllData<Message & ODataAttrs>(
      client,
      computeEndpointBasedOnConnection(connection, url),
      true,
      {
        $search: search,
        $filter: filter,
      },
    );

    const result = value.map<Element>((message) => ({
      label: util.types.toString(message.subject),
      key: util.types.toString(message.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
