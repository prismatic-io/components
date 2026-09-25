import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listSectionsExamplePayload } from "../../examplePayloads";
import { listSectionsInputs } from "../../inputs";
import { listSectionsOutputSchema } from "../../outputSchemas";
import type { PaginatedResponse, Section } from "../../types";
import { paginateResults } from "../../util";
export const listSections = action({
  display: {
    label: "List Sections",
    description:
      "Lists all the sections in the Help Center or in a specific category.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { filters, zendeskConnection, locale, pageLimit, fetchAll },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = filters.categoryId
      ? `/help_center/${locale}/categories/${filters.categoryId}/sections`
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
            pageLimit,
          ),
        },
      };
    }
    const params = {
      sort_by: filters.sortBy,
      sort_order: filters.sortOrder,
    };
    const { data } = await client.get<
      | PaginatedResponse<{
          sections: Section[];
        }>
      | {
          sections: Section[];
        }
    >(url, {
      params,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> =>
    fetchAll
      ? { data: { sections: listSectionsExamplePayload.data.sections } }
      : { data: listSectionsExamplePayload.data },
  inputs: listSectionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSectionsOutputSchema,
  }),
  examplePayload: listSectionsExamplePayload,
});
