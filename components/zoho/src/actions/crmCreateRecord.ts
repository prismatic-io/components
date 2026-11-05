import { action, type KeyValuePair, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { crmCreateRecordExamplePayload } from "../examplePayloads/crm";
import { connectionInput, crmRecordType, dynamicValues, fieldValues } from "../inputs";

const crmCreateRecord = action({
  display: {
    label: "CRM - Create Record",
    description: "Create a Zoho CRM record.",
  },
  inputs: {
    connection: connectionInput,
    recordType: crmRecordType,
    dynamicValues,
    fieldValues,
  },
  perform: async (context, { connection, recordType, dynamicValues, fieldValues }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const payload = {
      data: [
        {
          ...util.types.keyValPairListToObject((dynamicValues as KeyValuePair[]) || []),
          ...fieldValues,
        },
      ],
    };

    const url = `/${recordType}`;

    const { data } = await crmClient.request({
      method: "POST",
      url,
      data: payload,
    });

    return data;
  },
  examplePayload: crmCreateRecordExamplePayload,
});

export default crmCreateRecord;
