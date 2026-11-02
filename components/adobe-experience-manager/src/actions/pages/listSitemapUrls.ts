import { action, outputSchema } from "@prismatic-io/spectral";
import { createPublicClient } from "../../client";
import { listSitemapUrlsExamplePayload } from "../../examplePayloads";
import { listSitemapUrlsInputs } from "../../inputs";
import { listSitemapUrlsOutputSchema } from "../../outputSchemas";
import { createSitemapPageSource } from "../../pageSources/sitemapPageSource";

export const listSitemapUrls = action({
  display: {
    label: "List Sitemap URLs",
    description:
      "List page URLs and their last-modified dates from a site's sitemap, following a sitemap index. Pass the URLs to Get Published Page HTML.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { sitemapUrl, modifiedAfter, includePathPrefixes, excludePathPrefixes },
  ) => {
    const source = createSitemapPageSource(
      createPublicClient(context.debug.enabled),
    );
    const data = await source.listPages({
      sitemapUrl,
      modifiedAfter,
      includePathPrefixes,
      excludePathPrefixes,
    });
    return { data };
  },
  inputs: listSitemapUrlsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSitemapUrlsOutputSchema,
  }),
  examplePerform: async () => listSitemapUrlsExamplePayload,
  examplePayload: listSitemapUrlsExamplePayload,
});
