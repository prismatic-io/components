import { action } from "@prismatic-io/spectral";
import { listFeaturedKnowledgeArticlesInputs } from "../../inputs";
import {
  fetchAllKnowledgeRecords,
  getKnowledgeManagementApiClient,
} from "../../util";
export const listFeaturedKnowledgeArticles = action({
  display: {
    label: "List Featured Knowledge Articles",
    description:
      "Returns a list of the most-viewed knowledge articles and featured knowledge articles.",
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
        "/knowledge/articles/featured",
        {
          fields: filters.fields,
          kb: filters.kb,
          language: filters.language,
        },
      );
      return { data };
    }
    const { data } = await client.get("/knowledge/articles/featured", {
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
  inputs: listFeaturedKnowledgeArticlesInputs,
});
