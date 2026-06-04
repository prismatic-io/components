import { action } from "@prismatic-io/spectral";
import {
  categoryId,
  connectionInput,
  fetchAll,
  locale,
  pageLimit,
  sortBy,
  sortOrder,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { PaginatedResponse, Section } from "../../types";
import { listSectionsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listSections = action({
  display: {
    label: "List Sections",
    description:
      "Lists all the sections in the Help Center or in a specific category.",
  },
  perform: async (
    context,
    {
      sortBy,
      categoryId,
      sortOrder,
      zendeskConnection,
      locale,
      pageLimit,
      fetchAll,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = categoryId
      ? `/help_center/${locale}/categories/${categoryId}/sections`
      : `/help_center/${locale}/sections`;

    if (fetchAll) {
      const sections: Section[] = [];
      return {
        data: {
          sections: await paginateResults<Section>(
            client,
            url,
            sections,
            "sections",
            pageLimit || undefined,
          ),
        },
      };
    }

    const params = {
      sort_by: sortBy || undefined,
      sort_order: sortOrder || undefined,
    };

    const { data } = await client.get<
      PaginatedResponse<{ sections: Section[] }> | { sections: Section[] }
    >(url, {
      params,
    });

    return { data };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    categoryId: {
      ...categoryId,
      comments: "Input a categoryId to filter out sections by the ID provided.",
      required: false,
    },
    sortBy: {
      ...sortBy,
      model: [
        { label: "Position (Default)", value: "position" },
        {
          label: "Created At",
          value: "created_at",
        },
        {
          label: "Updated At",
          value: "updated_at",
        },
      ],
    },
    sortOrder,
    pageLimit,
    fetchAll,
  },
  examplePayload: { data: listSectionsExamplePayload },
});
