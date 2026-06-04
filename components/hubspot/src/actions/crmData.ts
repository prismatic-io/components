import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { getHubspotClient } from "../client";
import {
  cancelImportPayload,
  exportCRMDataPayload,
  getAnImportPayload,
  importCRMDataPayload,
  listActiveImportsPayload,
} from "../examplePayloads";
import {
  associatedObjectType,
  connectionInput,
  createContactListFromImport,
  dataFiles,
  dateFormat,
  exportName,
  files,
  format,
  importId,
  importOperations,
  language,
  listId,
  marketableContactImport,
  name,
  objectProperties,
  objectType,
  publicCrmSearchRequest,
  schemaType,
  timeout,
} from "../inputs";
import { getAllPaginatedData } from "../util";

export const cancelImport = action({
  display: {
    label: "Cancel Import",
    description: "Cancels an active import.",
  },
  perform: async (context, { timeout, hubspotConnection, importId }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });

    return {
      data: (await client.post(`/crm/v3/imports/${importId}/cancel`)).data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    importId,
    timeout,
  },
  examplePayload: cancelImportPayload,
});

export const listActiveImports = action({
  display: {
    label: "List Active Imports",
    description: "Returns a paged list of active imports for this account.",
  },
  perform: async (context, { timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const data = await getAllPaginatedData(client, "/crm/v3/imports", true, true, {});

    return {
      data,
    };
  },

  inputs: {
    hubspotConnection: connectionInput,
    timeout,
  },
  examplePayload: listActiveImportsPayload,
});

export const importCRMData = action({
  display: {
    label: "Import CRM Data",
    description:
      "Import CRM records and activities into your HubSpot account, such as contacts, companies, and notes.",
  },
  perform: async (
    context,
    {
      hubspotConnection,
      timeout,
      name,
      importOperations,
      dateFormat,
      marketableContactImport,
      createContactListFromImport,
      files,
      dataFiles,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const formData = new FormData();

    const importRequest = {
      name,
      ...(importOperations && {
        importOperations,
      }),
      dateFormat,
      marketableContactImport,
      createContactListFromImport,
      files,
    };

    formData.append("importRequest", JSON.stringify(importRequest));

    for (const fileName in dataFiles) {
      const fileData = Buffer.from((dataFiles[fileName] as { data }).data);

      formData.append("files", fileData, {
        filename: fileName,
      });
    }

    return {
      data: (
        await client.post("/crm/v3/imports", formData, {
          headers: { ...formData.getHeaders() },
        })
      ).data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    name: {
      ...name,
      comments: "The name of the import.",
      example: "Contact Company import",
    },
    files,
    dataFiles,
    importOperations,
    dateFormat,
    marketableContactImport,
    createContactListFromImport,
    timeout,
  },
  examplePayload: importCRMDataPayload,
});

export const getAnImport = action({
  display: {
    label: "Get Import",
    description: "Get a complete summary of an import record, including any updates.",
  },
  perform: async (context, { timeout, hubspotConnection, importId }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (await client.get(`/crm/v3/imports/${importId}`)).data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    importId,
    timeout,
  },
  examplePayload: getAnImportPayload,
});

export const exportCRMData = action({
  display: {
    label: "Export CRM Data",
    description: "Begins exporting CRM data for the portal as specified in the request body.",
  },
  perform: async (
    context,
    {
      timeout,
      hubspotConnection,
      schemaType,
      format,
      exportName,
      objectProperties,
      associatedObjectType,
      objectType,
      language,
      listId,
      publicCrmSearchRequest,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });
    
    if (schemaType === "PublicExportListRequest" && !listId) {
      throw new Error("List Id is required for Schema Type PublicExportListRequest");
    }

    const payload = {
      exportType: schemaType,
      format,
      exportName,
      objectProperties,
      ...(associatedObjectType && { associatedObjectType }),
      objectType,
      language,
      ...(publicCrmSearchRequest && { publicCrmSearchRequest }),
      ...(listId && { listId }),
    };

    const data = (await client.post("/crm/v3/exports/export/async", payload)).data;

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    schemaType,
    format,
    exportName,
    objectProperties,
    objectType: {
      ...objectType,
      comments:
        "The name or ID of the object you're exporting. For standard objects, you can use the object's name (e.g., CONTACT), but for custom objects, you must use the objectTypeId value, you can find this value in the response of the List Custom Objects action.",
    },
    language,
    listId,
    publicCrmSearchRequest,
    associatedObjectType,
    timeout,
  },
  examplePayload: exportCRMDataPayload,
});
