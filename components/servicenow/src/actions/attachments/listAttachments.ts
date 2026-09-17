import { action } from "@prismatic-io/spectral";
import { listAttachmentsExamplePayload } from "../../examplePayloads";
import { listAttachmentsInputs } from "../../inputs";
import { createNowApiClient, fetchAllTableRecords } from "../../util";
export const listAttachments = action({
  display: {
    label: "List Attachments",
    description: "Returns the metadata for multiple attachments.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      apiVersionInput,
      connection,
      fetchAll,
      instanceUrlInput,
      pagination,
      sysparmQuery,
    },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    if (fetchAll) {
      const data = await fetchAllTableRecords(client, "/attachment", {
        sysparm_query: sysparmQuery,
      });
      return { data };
    }
    const { data } = await client.get("/attachment", {
      params: {
        sysparm_limit: pagination.sysparmLimit,
        sysparm_offset: pagination.sysparmOffset,
        sysparm_query: sysparmQuery,
      },
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listAttachmentsExamplePayload.data,
  }),
  inputs: listAttachmentsInputs,
  examplePayload: listAttachmentsExamplePayload,
});
