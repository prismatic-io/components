import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { contactId, connectionInput } from "../../inputs";
import { getContactHistoryExamplePayload } from "../../examplePayloads";

export const getContactHistory = action({
  display: {
    label: "Get Contact History",
    description:
      "Get the information and metadata of a contact's history by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/contacts/${params.contactId}/history`);
    return { data };
  },
  inputs: { contactId, xeroConnection: connectionInput },
  examplePayload: getContactHistoryExamplePayload,
});
