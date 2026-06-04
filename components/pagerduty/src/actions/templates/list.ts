import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listTemplatesExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  limit,
  offset,
  templateQuery,
  templateSortBy,
  templateType,
  total,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const getTemplates = action({
  display: {
    label: "List Templates",
    description: "List all templates with optional filters.",
  },
  perform: async (
    context,
    { connection, limit, offset, total, fetchAll, query, templateType, sortBy },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      total,
      limit,
      offset,
      query,
      template_type: templateType,
      sort_by: sortBy,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.TEMPLATES,
          objectKey: "templates",
        }),
      };
    }

    const { data } = await client.get(ENDPOINTS.TEMPLATES, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    limit,
    offset,
    total,
    query: templateQuery,
    templateType,
    sortBy: templateSortBy,
  },
  examplePayload: listTemplatesExamplePayload,
});
