import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { getAllPaginatedData } from "../util";
import { selectImportInputs } from "../inputs";

export const selectImport = dataSource({
  display: {
    label: "Select Import",
    description: "Select an import from the list of active imports.",
  },
  inputs: selectImportInputs,
  perform: async (context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const imports = await getAllPaginatedData(client, "/crm/v3/imports", true, true, {});

    const result = (imports as Record<string, unknown>[]).map<Element>((item) => ({
      label: `Import ${util.types.toString(item.id)}`,
      key: util.types.toString(item.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
