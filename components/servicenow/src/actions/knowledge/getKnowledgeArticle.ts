import { action } from "@prismatic-io/spectral";
import { getKnowledgeArticleInputs } from "../../inputs";
import { getKnowledgeManagementApiClient } from "../../util";
export const getKnowledgeArticle = action({
  display: {
    label: "Get Knowledge Article",
    description:
      "Returns specific knowledge article content and its field values.",
  },
  performSafety: "safe",
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
  inputs: getKnowledgeArticleInputs,
});
