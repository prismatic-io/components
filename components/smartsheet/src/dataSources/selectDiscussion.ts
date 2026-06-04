import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectDiscussionInputs } from "../inputs";

export const selectDiscussion = dataSource({
  display: {
    label: "Select Discussion",
    description: "Select a discussion from a specific sheet.",
  },
  dataSourceType: "picklist",
  inputs: selectDiscussionInputs,
  perform: async (_context, { connection, sheetId }) => {
    const client = createClient(connection, false);
    const {
      data: { data: discussions },
    } = await client.get(`/sheets/${sheetId}/discussions`, {
      params: { includeAll: true },
    });

    if (!discussions || !Array.isArray(discussions)) {
      return { result: [] };
    }

    const result: Element[] = discussions.map(({ title: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
