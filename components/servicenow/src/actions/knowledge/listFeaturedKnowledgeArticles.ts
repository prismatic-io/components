import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fetchAll,
  fields,
  instanceUrlInput,
  kb,
  language,
  limit,
  offset,
} from "../../inputs";
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
  perform: async (
    context,
    {
      connection,
      fetchAll,
      instanceUrlInput,
      apiVersionInput,
      fields,
      kb,
      language,
      limit,
      offset,
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
        { fields, kb, language },
      );
      return { data };
    }

    const { data } = await client.get("/knowledge/articles/featured", {
      params: { fields, kb, language, limit, offset },
    });
    return { data: data.result };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    fields,
    kb,
    language,
    fetchAll,
    limit,
    offset,
  },
});
