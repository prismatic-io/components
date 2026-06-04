import { action, input, util } from "@prismatic-io/spectral";
import FormData from "form-data";
import { ClientType, createClient } from "../client";
import { crmAddAttachmentExamplePayload } from "../examplePayloads/crm";
import { connectionInput, recordId } from "../inputs";


const supportedModules = [
  "Accounts",
  "Campaigns",
  "Cases",
  "Contacts",
  "Custom",
  "Deals",
  "Events",
  "Invoices",
  "Leads",
  "Notes",
  "Price Books",
  "Products",
  "Purchase Orders",
  "Quotes",
  "Sales Orders",
  "Solutions",
  "Tasks",
  "Vendors",
];

const crmAddAttachment = action({
  display: {
    label: "CRM - Add Attachment",
    description: "Add an attachment to a Zoho CRM record.",
  },
  inputs: {
    connection: connectionInput,
    recordType: input({
      label: "Record Type",
      required: true,
      default: "Leads",
      comments: "The type of CRM record to attach the file to.",
      type: "string",
      model: supportedModules.map((recordType) => ({
        label: recordType,
        value: recordType,
      })),
      clean: util.types.toString,
    }),
    recordId: { ...recordId, dataSource: "selectCrmRecord" },
    file: input({
      label: "File",
      type: "data",
      required: true,
      comments:
        "The file to upload. Accepts string contents or binary file data from a previous step.",
      clean: util.types.toBufferDataPayload,
    }),
    fileName: input({
      label: "File Name",
      placeholder: "Enter file name",
      type: "string",
      required: true,
      comments: "The name of the file to upload, including extension.",
      example: "document.pdf",
      clean: util.types.toString,
    }),
  },
  perform: async (context, params) => {
    const crmClient = createClient(params.connection, ClientType.CRM, context.debug.enabled);
    const formData = new FormData();
    formData.append("file", params.file.data, { filename: params.fileName });
    const { data } = await crmClient.post(
      `/${params.recordType}/${params.recordId}/Attachments`,
      formData,
      { headers: formData.getHeaders() },
    );
    return data;
  },
  examplePayload: crmAddAttachmentExamplePayload,
});

export default crmAddAttachment;
