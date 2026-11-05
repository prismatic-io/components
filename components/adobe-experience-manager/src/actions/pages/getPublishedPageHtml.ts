import { action, outputSchema } from "@prismatic-io/spectral";
import { createPublicClient } from "../../client";
import { getPublishedPageHtmlExamplePayload } from "../../examplePayloads";
import { getPublishedPageHtmlInputs } from "../../inputs";
import { getPublishedPageHtmlOutputSchema } from "../../outputSchemas";
import { createSitemapPageSource } from "../../pageSources/sitemapPageSource";

export const getPublishedPageHtml = action({
  display: {
    label: "Get Published Page HTML",
    description:
      "Retrieve the published HTML of a page by URL. Accepts URLs from List Sitemap URLs or AEM Sites Event Subscription page events.",
  },
  performSafety: "notAllowed",
  perform: async (context, { pageUrl }) => {
    const source = createSitemapPageSource(createPublicClient(context.debug.enabled));
    const data = await source.getPageContent(pageUrl);
    return { data };
  },
  inputs: getPublishedPageHtmlInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: getPublishedPageHtmlOutputSchema }),
  examplePerform: async () => getPublishedPageHtmlExamplePayload,
  examplePayload: getPublishedPageHtmlExamplePayload,
});
