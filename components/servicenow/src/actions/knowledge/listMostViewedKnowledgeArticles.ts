import { action } from "@prismatic-io/spectral";
import { listMostViewedKnowledgeArticlesInputs } from "../../inputs";
import {
  fetchAllKnowledgeRecords,
  getKnowledgeManagementApiClient,
} from "../../util";
export const listMostViewedKnowledgeArticles = action({
  display: {
    label: "List Most Viewed Knowledge Articles",
    description:
      "Returns a list of knowledge articles prioritized by most-viewed.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      fetchAll,
      instanceUrlInput,
      apiVersionInput,
      filters,
      pagination,
    },
  ) => {
    const client = getKnowledgeManagementApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    if (fetchAll) {
      const data = await fetchAllKnowledgeRecords(
        client,
        "/knowledge/articles/most_viewed",
        {
          fields: filters.fields,
          kb: filters.kb,
          language: filters.language,
        },
      );
      return { data };
    }
    const { data } = await client.get("/knowledge/articles/most_viewed", {
      params: {
        fields: filters.fields,
        kb: filters.kb,
        language: filters.language,
        limit: pagination.limit,
        offset: pagination.offset,
      },
    });
    return { data: data.result };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: [] },
  }),
  inputs: listMostViewedKnowledgeArticlesInputs,
});
