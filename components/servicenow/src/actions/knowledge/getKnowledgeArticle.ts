import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  articleId,
  connection,
  fields,
  instanceUrlInput,
  language,
  searchId,
  searchRank,
  updateView,
} from "../../inputs";
import { getKnowledgeManagementApiClient } from "../../util";

export const getKnowledgeArticle = action({
  display: {
    label: "Get Knowledge Article",
    description:
      "Returns specific knowledge article content and its field values.",
  },
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      articleId,
      fields,
      language,
      searchId,
      searchRank,
      updateView,
    },
  ) => {
    const client = getKnowledgeManagementApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(`/knowledge/articles/${articleId}`, {
      params: {
        fields,
        language,
        search_id: searchId,
        search_rank: searchRank,
        update_view: updateView,
      },
    });
    return {
      data: data.result,
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    articleId,
    fields,
    language,
    searchId,
    searchRank,
    updateView,
  },
});
