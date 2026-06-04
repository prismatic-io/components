import { action, type KeyValuePair, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { crmUpdateRecordExamplePayload } from "../examplePayloads/crm";
import { connectionInput, crmRecordType, dynamicValues, fieldValues, recordId } from "../inputs";

const crmUpdateRecord = action({
  display: {
    label: "CRM - Update Record",
    description: "Update a Zoho CRM record.",
  },
  inputs: {
    connection: connectionInput,
    recordType: crmRecordType,
    recordId: { ...recordId, dataSource: "selectCrmRecord" },
    dynamicValues,
    fieldValues,
  },
  perform: async (context, { connection, recordType, recordId, dynamicValues, fieldValues }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const payload = {
      data: [
        {
          ...util.types.keyValPairListToObject((dynamicValues as KeyValuePair[]) || []),
          ...fieldValues,
        },
      ],
    };

    const url = `/${recordType}/${recordId}`;

    const { data } = await crmClient.request({
      method: "PUT",
      url,
      data: payload,
    });

    return data;
  },
  examplePayload: crmUpdateRecordExamplePayload,
});

export default crmUpdateRecord;
