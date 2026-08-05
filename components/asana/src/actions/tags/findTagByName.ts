import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { findTagByNameExamplePayload } from "../../examplePayloads";
import { findTagByNameInputs } from "../../inputs";
import type { PaginatedResponse, Tag } from "../../types";
export const findTagByName = action({
  display: {
    label: "Find Tag by Name",
    description: "Find a tag by name within a workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    let offset: string | undefined;
    let stop = false;
    while (!stop) {
      const response: PaginatedResponse<Tag> = await client.get(
        `workspaces/${params.workspaceId}/tags`,
        {
          params: {
            offset,
            opt_fields: params.optFields,
          },
        },
      );
      const filteredData = response.data.data.filter(
        (tag) => params.tagName === tag.name,
      );
      if (filteredData.length > 0) {
        return { data: filteredData[0] };
      }
      offset = response.data.next_page?.offset;
      if (!offset) {
        stop = true;
      }
    }
    throw new Error(`No tag named "${params.tagName}" found.`);
  },
  inputs: findTagByNameInputs,
  examplePayload: findTagByNameExamplePayload,
});
