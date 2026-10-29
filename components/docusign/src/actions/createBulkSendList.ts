import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput } from "../inputs";
import { bulkSendListJson } from "../json/bulkSendListJson";

export const createBulkSendList = action({
  display: {
    label: "Create Bulk Send List",
    description:
      "This method creates a bulk send list that you can use to send an envelope to up to 1,000 recipients at once.",
  },
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );

    const { data } = await client.post(`/bulk_send_lists`, jsonInput);
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      default: JSON.stringify(bulkSendListJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/bulkenvelopes/bulksend/createbulksendlist/",
    },
  },
});
