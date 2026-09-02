import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { getHubspotClient } from "../../client";
import { importCRMDataExamplePayload } from "../../examplePayloads";
import { importCRMDataInputs } from "../../inputs";
export const importCRMData = action({
  display: {
    label: "Import CRM Data",
    description:
      "Import CRM records and activities into the HubSpot account, such as contacts, companies, and notes.",
  },
  performSafety: "notAllowed",
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
      const fileData = Buffer.from(
        (
          dataFiles[fileName] as {
            data;
          }
        ).data,
      );
      formData.append("files", fileData, {
        filename: fileName,
      });
    }
    const { data } = await client.post("/crm/v3/imports", formData, {
      headers: { ...formData.getHeaders() },
    });
    return { data };
  },
  inputs: importCRMDataInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: importCRMDataExamplePayload.data,
  }),
  examplePayload: importCRMDataExamplePayload,
});
