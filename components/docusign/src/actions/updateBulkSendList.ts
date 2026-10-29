import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput, bulkSendListId } from "../inputs";
import { bulkSendListJson } from "../json/bulkSendListJson";

export const updateBulkSendList = action({
  display: {
    label: "Update Bulk Send List",
    description:
      "This method replaces the definition of an existing bulk send list.",
  },
  perform: async (context, { connection, jsonInput, bulkSendListId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );

    const { data } = await client.put(
      `/bulk_send_lists/${bulkSendListId}`,
      jsonInput,
    );
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      default: JSON.stringify(bulkSendListJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/bulkenvelopes/bulksend/updatebulksendlist/",
    },
    bulkSendListId,
  },
});
