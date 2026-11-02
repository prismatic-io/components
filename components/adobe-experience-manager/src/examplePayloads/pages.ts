import type { Element } from "@prismatic-io/spectral";
import type { PageContent, PageRef } from "../types";

export const listSitemapUrlsExamplePayload: { data: PageRef[] } = {
  data: [
    {
      loc: "https://www.example.com/en/adventures/surf-camp.html",
      lastmod: "2026-09-18T09:25:02.000Z",
    },
    { loc: "https://www.example.com/en/about-us.html", lastmod: null },
  ],
};

export const getPublishedPageHtmlExamplePayload: { data: PageContent } = {
  data: {
    url: "https://www.example.com/en/adventures/surf-camp.html",
    finalUrl: "https://www.example.com/en/adventures/surf-camp.html",
    statusCode: 200,
    contentType: "text/html;charset=utf-8",
    lastModified: "Thu, 18 Sep 2026 09:25:02 GMT",
    etag: '"a1b2c3d4"',
    html: "<!DOCTYPE html><html><head><title>Surf Camp</title></head><body><h1>Surf Camp</h1></body></html>",
  },
};

export const selectSitemapPageExamplePayload: { result: Element[] } = {
  result: [
    {
      key: "https://www.example.com/en/about-us.html",
      label: "https://www.example.com/en/about-us.html",
    },
    {
      key: "https://www.example.com/en/adventures/surf-camp.html",
      label: "https://www.example.com/en/adventures/surf-camp.html",
    },
  ],
};
