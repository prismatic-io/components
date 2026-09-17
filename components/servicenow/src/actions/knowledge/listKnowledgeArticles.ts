import { action } from "@prismatic-io/spectral";
import { listKnowledgeArticlesInputs } from "../../inputs";
import {
  fetchAllKnowledgeRecords,
  getKnowledgeManagementApiClient,
} from "../../util";
export const listKnowledgeArticles = action({
  display: {
    label: "List Knowledge Articles",
    description:
      "Returns a list of knowledge base (KB) articles which can be searched and filtered using various parameters.",
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
        "/knowledge/articles",
        {
          filter: filters.filter,
          fields: filters.fields,
          kb: filters.kb,
          language: filters.language,
          query: filters.query,
        },
      );
      return { data };
    }
    const { data } = await client.get("/knowledge/articles", {
      params: {
        filter: filters.filter,
        fields: filters.fields,
        kb: filters.kb,
        language: filters.language,
        limit: pagination.limit,
        offset: pagination.offset,
        query: filters.query,
      },
    });
    return { data: data.result };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: [] },
  }),
  inputs: listKnowledgeArticlesInputs,
});
