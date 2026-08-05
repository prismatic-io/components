import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listSectionsExamplePayload } from "../../examplePayloads";
import { listSectionsInputs } from "../../inputs";
export const listSections = action({
  display: {
    label: "List Sections",
    description: "List all sections in a given project.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/projects/${params.projectId}/sections`,
      {
        params: {
          offset: params.pagination.offset,
          limit: params.pagination.limit,
          opt_fields: params.optFields,
        },
      },
    );
    return { data };
  },
  inputs: listSectionsInputs,
  examplePayload: listSectionsExamplePayload,
});
