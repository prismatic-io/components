import { dataSource, type Element } from "@prismatic-io/spectral";
import { createPublicClient } from "../client";
import { MAX_DATA_SOURCE_ITEMS } from "../constants";
import { selectSitemapPageExamplePayload } from "../examplePayloads";
import { selectSitemapPageInputs } from "../inputs";
import { createSitemapPageSource } from "../pageSources/sitemapPageSource";
import { compareElementLabels } from "../utils";

export const selectSitemapPage = dataSource({
  display: {
    label: "Select Sitemap Page",
    description: "Select a published page URL from a site's sitemap.",
  },
  inputs: selectSitemapPageInputs,
  examplePayload: selectSitemapPageExamplePayload,
  perform: async (_context, { sitemapUrl }) => {
    const source = createSitemapPageSource(createPublicClient(false));
    const pages = await source.listPages({ sitemapUrl });
    const result = pages
      .slice(0, MAX_DATA_SOURCE_ITEMS)
      .map<Element>((page) => ({ label: page.loc, key: page.loc }))
      .sort(compareElementLabels);
    return { result };
  },
  dataSourceType: "picklist",
});
