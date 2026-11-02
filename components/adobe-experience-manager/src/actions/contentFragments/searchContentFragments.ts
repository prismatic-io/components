import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { SITES_API_PATH } from "../../constants";
import { searchContentFragmentsExamplePayload } from "../../examplePayloads";
import { searchContentFragmentsInputs } from "../../inputs";
import { searchContentFragmentsOutputSchema } from "../../outputSchemas";
import type {
  ContentFragment,
  ContentFragmentSearchQuery,
  ContentFragmentSortField,
  ContentFragmentStatus,
} from "../../types";
import { fetchCursorPages, toTimeInterval } from "../../utils";

export const searchContentFragments = action({
  display: {
    label: "Search Content Fragments",
    description:
      "Search content fragments by path, status, model, tag, locale, modified or published date, and text.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAemClient(params.connection, context.debug.enabled);
    const query: ContentFragmentSearchQuery = {
      filter: {
        path: params.path,
        onlyDirectChildren: params.onlyDirectChildren || undefined,
        status: params.statuses.length
          ? (params.statuses as ContentFragmentStatus[])
          : undefined,
        modelIds: params.modelIds.length ? params.modelIds : undefined,
        tags: params.tags.length ? params.tags : undefined,
        locale: params.locales.length ? params.locales : undefined,
        modified: toTimeInterval(
          params.dateRangeFilters?.modifiedAfter,
          params.dateRangeFilters?.modifiedBefore,
        ),
        published: toTimeInterval(
          params.dateRangeFilters?.publishedAfter,
          params.dateRangeFilters?.publishedBefore,
        ),
        fullText: params.filters?.fullText
          ? { text: params.filters.fullText }
          : undefined,
      },
      sort: params.filters?.sortOn
        ? [
            {
              on: params.filters.sortOn as ContentFragmentSortField,
              order: params.filters?.sortOrder === "DESC" ? "DESC" : "ASC",
            },
          ]
        : undefined,
    };
    const data = await fetchCursorPages<ContentFragment>(
      client,
      `${SITES_API_PATH}/cf/fragments/search`,
      {
        query: JSON.stringify(query),
        projection: params.projection,
        includeMetadata: params.includeMetadata || undefined,
      },
      { fetchAll: params.fetchAll, ...params.pagination },
    );
    return { data };
  },
  inputs: searchContentFragmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchContentFragmentsOutputSchema,
  }),
  examplePerform: async () => searchContentFragmentsExamplePayload,
  examplePayload: searchContentFragmentsExamplePayload,
});
