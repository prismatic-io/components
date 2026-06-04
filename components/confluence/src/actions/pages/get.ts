import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  pageId,
  bodyFormat,
  getDraft,
  previousVersion,
  includeLabels,
  includeProperties,
  includeOperations,
  includeLikes,
  includeVersions,
  includeVersion,
  includeFavoritedByCurrentUserStatus,
} from "../../inputs";
import { getPageExamplePayload } from "../../examplePayloads";

export const getPage = action({
  display: {
    label: "Get Page",
    description: "Returns a specific Page.",
  },
  inputs: {
    connectionInput,
    pageId,
    bodyFormat,
    getDraft,
    previousVersion,
    includeLabels,
    includeProperties,
    includeOperations,
    includeLikes,
    includeVersions,
    includeVersion,
    includeFavoritedByCurrentUserStatus,
  },
  perform: async (
    context,
    {
      connectionInput,
      pageId,
      bodyFormat,
      getDraft,
      previousVersion,
      includeLabels,
      includeProperties,
      includeOperations,
      includeLikes,
      includeVersions,
      includeVersion,
      includeFavoritedByCurrentUserStatus,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const params = {
      "body-format": bodyFormat,
      "get-draft": getDraft,
      version: previousVersion,
      "include-labels": includeLabels,
      "include-properties": includeProperties,
      "include-operations": includeOperations,
      "include-likes": includeLikes,
      "include-versions": includeVersions,
      "include-version": includeVersion,
      "include-favorited-by-current-user-status":
        includeFavoritedByCurrentUserStatus,
    };
    const { data } = await client.get(`/pages/${pageId}`, {
      params,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: getPageExamplePayload,
  },
});
