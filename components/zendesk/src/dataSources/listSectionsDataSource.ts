import { dataSource, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { listSectionsDataSourceExamplePayload } from "../examplePayloads";
import { listSectionsDataSourceInputs } from "../inputs";
import type { Section } from "../types";
import { paginateResults } from "../util";
export const listSectionsDataSource = dataSource({
  display: {
    label: "Select Sections",
    description: "Select a section from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection, locale }) => {
    const client = rawHttpClient(zendeskConnection);
    const results: Section[] = [];
    const nextUrl = `/help_center/${locale}/sections`;
    const paginatedResults = await paginateResults<Section>(
      client,
      nextUrl,
      results,
      "sections",
    );
    return {
      result: paginatedResults.map((section) => ({
        label: section.name,
        key: util.types.toString(section.id),
      })),
    };
  },
  inputs: listSectionsDataSourceInputs,
  dataSourceType: "picklist",
  examplePayload: listSectionsDataSourceExamplePayload,
});
