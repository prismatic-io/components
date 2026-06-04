import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { computeEndpointBasedOnConnection, fetchAllData } from "../util";
import type { MailSearchFolder } from "@microsoft/microsoft-graph-types";
import type { ODataAttrs } from "../types";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectMailFolder = dataSource({
  display: {
    label: "Select Mail Folder",
    description: "Select a mail folder from the list of folders.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);
    const { value } = await fetchAllData<MailSearchFolder & ODataAttrs>(
      client,
      computeEndpointBasedOnConnection(connection, "/me/mailFolders"),
      true,
      {},
    );

    const result = value.map<Element>((folder) => ({
      label: util.types.toString(folder.displayName),
      key: util.types.toString(folder.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
