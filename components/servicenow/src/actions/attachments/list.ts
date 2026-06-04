import { action } from "@prismatic-io/spectral";
import { listAttachmentsResponse } from "../../examplePayloads";
import {
  apiVersionInput,
  connection,
  fetchAll,
  instanceUrlInput,
  sysparmLimit,
  sysparmOffset,
  sysparmQuery,
} from "../../inputs";
import { createNowApiClient, fetchAllTableRecords } from "../../util";

export const listAttachments = action({
  display: {
    label: "List Attachments",
    description: "Returns the metadata for multiple attachments.",
  },
  perform: async (
    context,
    {
      apiVersionInput,
      connection,
      fetchAll,
      instanceUrlInput,
      sysparmLimit,
      sysparmOffset,
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
        sysparm_limit: sysparmLimit,
        sysparm_offset: sysparmOffset,
        sysparm_query: sysparmQuery,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysparmQuery,
    fetchAll,
    sysparmLimit: {
      ...sysparmLimit,
      comments:
        "Limit to be applied on pagination. Default is 1000. Unusually large values can impact system performance.",
    },
    sysparmOffset,
  },
  examplePayload: {
    data: listAttachmentsResponse,
  },
});
