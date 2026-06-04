import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { crmGetRecordsExamplePayload } from "../examplePayloads/crm";
import {
  connectionInput,
  crmRecordType,
  fetchAll,
  fields,
  page,
  page_token,
  per_page,
  sort_by,
  sort_order,
} from "../inputs";
import { fetchAllPages } from "../util/pagination";

const crmGetRecords = action({
  display: {
    label: "CRM - Get Records",
    description: "Get a collection of Zoho CRM records.",
  },
  inputs: {
    connection: connectionInput,
    recordType: crmRecordType,
    fields: { ...fields, required: true },
    page,
    per_page,
    page_token,
    sort_order,
    sort_by,
    fetchAll,
  },
  perform: async (
    context,
    { connection, recordType, fields, page, per_page, page_token, sort_order, sort_by, fetchAll },
  ) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const url = `/${recordType}`;
    const params = Object.fromEntries(
      Object.entries({
        fields: fields.join(","),
        page,
        per_page,
        page_token,
        sort_order,
        sort_by,
      }).filter(([_key, val]) => Boolean(val)),
    );

    const data = await fetchAllPages(crmClient, url, params, "data", fetchAll);

    return {
      data,
    };
  },
  examplePayload: crmGetRecordsExamplePayload,
});

export default crmGetRecords;
