import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import {
  MAX_DATA_SOURCE_ITEMS,
  MAX_PAGE_LIMIT,
  SITES_API_PATH,
} from "../constants";
import { selectContentFragmentExamplePayload } from "../examplePayloads";
import { selectContentFragmentInputs } from "../inputs";
import type { ContentFragment } from "../types";
import { compareElementLabels, fetchCursorPages } from "../utils";

export const selectContentFragment = dataSource({
  display: {
    label: "Select Content Fragment",
    description:
      "Select a content fragment from the list of content fragments.",
  },
  inputs: selectContentFragmentInputs,
  examplePayload: selectContentFragmentExamplePayload,
  perform: async (_context, { connection, path }) => {
    const client = createAemClient(connection, false);
    const fragments: ContentFragment[] = [];
    let cursor: string | undefined;
    do {
      const page = await fetchCursorPages<ContentFragment>(
        client,
        `${SITES_API_PATH}/cf/fragments`,
        { path },
        { fetchAll: false, cursor, limit: MAX_PAGE_LIMIT },
      );
      fragments.push(...page.items);
      cursor = page.cursor;
    } while (cursor && fragments.length < MAX_DATA_SOURCE_ITEMS);
    const result = fragments
      .slice(0, MAX_DATA_SOURCE_ITEMS)
      .map<Element>((fragment) => ({
        label: fragment.title
          ? `${fragment.title} (${fragment.path})`
          : fragment.path,
        key: fragment.id,
      }))
      .sort(compareElementLabels);
    return { result };
  },
  dataSourceType: "picklist",
});
