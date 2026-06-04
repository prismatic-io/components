import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fetchAll,
  fields,
  filter,
  instanceUrlInput,
  kb,
  language,
  limit,
  offset,
  query,
} from "../../inputs";
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
  perform: async (
    context,
    {
      connection,
      fetchAll,
      instanceUrlInput,
      apiVersionInput,
      filter,
      fields,
      kb,
      language,
      limit,
      offset,
      query,
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
        { filter, fields, kb, language, query },
      );
      return { data };
    }

    const { data } = await client.get("/knowledge/articles", {
      params: { filter, fields, kb, language, limit, offset, query },
    });
    return { data: data.result };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    filter,
    fields,
    kb,
    language,
    query,
    fetchAll,
    limit,
    offset,
  },
});
