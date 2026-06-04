import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { crmRemoveRecordExamplePayload } from "../examplePayloads/crm";
import { connectionInput, crmRecordType, recordId } from "../inputs";

const crmRemoveRecord = action({
  display: {
    label: "CRM - Remove Record",
    description: "Remove a Zoho CRM record.",
  },
  inputs: {
    connection: connectionInput,
    recordType: crmRecordType,
    recordId: { ...recordId, dataSource: "selectCrmRecord" },
  },
  perform: async (context, { connection, recordType, recordId }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const url = `/${recordType}/${recordId}`;

    const { data } = await crmClient.request({
      method: "DELETE",
      url,
    });

    return data;
  },
  examplePayload: crmRemoveRecordExamplePayload,
});

export default crmRemoveRecord;
