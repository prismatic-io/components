import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClassicClient } from "../client";
import { selectTagExamplePayload } from "../examplePayloads";
import { selectTagInputs } from "../inputs";
import { fetchTags, sortByLabel } from "../util";
export const selectTag = dataSource({
  examplePayload: selectTagExamplePayload,
  display: {
    label: "Select Tag",
    description: "Fetch tags from Qualys for use in dropdown selectors.",
  },
  dataSourceType: "picklist",
  inputs: selectTagInputs,
  perform: async (_context, { connection, staticOnly }) => {
    const client = createClassicClient(connection, false);
    const tags = await fetchTags(client, { fetchAll: true });
    const filtered = staticOnly ? tags.filter((t) => !t.ruleType) : tags;
    const elements = filtered.map<Element>((t) => ({
      key: util.types.toString(t.id),
      label: t.name,
    }));
    return { result: sortByLabel(elements) };
  },
});
