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

export const listMostViewedKnowledgeArticles = action({
  display: {
    label: "List Most Viewed Knowledge Articles",
    description:
      "Returns a list of knowledge articles prioritized by most-viewed.",
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
        "/knowledge/articles/most_viewed",
        { fields, kb, language },
      );
      return { data };
    }

    const { data } = await client.get("/knowledge/articles/most_viewed", {
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
