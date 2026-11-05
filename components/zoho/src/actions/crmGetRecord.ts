import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { crmGetRecordExamplePayload } from "../examplePayloads/crm";
import { connectionInput, crmRecordType, fields, recordId } from "../inputs";

const crmGetRecord = action({
  display: {
    label: "CRM - Get Record",
    description: "Get a single Zoho CRM record.",
  },
  inputs: {
    connection: connectionInput,
    recordType: crmRecordType,
    recordId: { ...recordId, dataSource: "selectCrmRecord" },
    fields,
  },
  perform: async (context, { connection, recordType, recordId, fields }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const url = `/${recordType}/${recordId}`;
    const params = Object.fromEntries(
      Object.entries({
        fields: fields.join(","),
      }).filter(([_key, val]) => Boolean(val)),
    );

    const { data } = await crmClient.request({
      method: "GET",
      url,
      params,
    });

    if (!data) {
      throw new Error(`"${recordType}" with ID "${recordId}" not found.`);
    }

    return data;
  },
  examplePayload: crmGetRecordExamplePayload,
});

export default crmGetRecord;
