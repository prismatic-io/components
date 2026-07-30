import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { connectionInput, taskId, tagId, optFields } from "../../inputs";
import { TAG_OPT_FIELDS } from "../../util";
export const addTagToTask = action({
  display: {
    label: "Add Tag to Task",
    description: "Add a tag to an existing task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/tasks/${params.taskId}/addTag`,
      {
        data: {
          tag: params.tagId,
        },
      },
      {
        params: {
          opt_fields: params.optFields,
        },
      },
    );
    return { data };
  },
  inputs: {
    asanaConnection: connectionInput,
    taskId,
    tagId,
    optFields: { ...optFields, default: TAG_OPT_FIELDS },
  },
  examplePayload: { data: { data: {} } },
});
