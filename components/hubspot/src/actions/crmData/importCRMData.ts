import { action, outputSchema } from "@prismatic-io/spectral";
import { importSchema } from "../../outputSchemas";
import FormData from "form-data";
import { getHubspotClient } from "../../client";
import { importCRMDataExamplePayload } from "../../examplePayloads";
import { importCRMDataInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
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
      dateFormat,
      importOptions,
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
      ...(importOptions.importOperations && {
        importOperations: importOptions.importOperations,
      }),
      dateFormat,
      marketableContactImport: importOptions.marketableContactImport,
      createContactListFromImport: importOptions.createContactListFromImport,
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
    const { data } = await client.post(hubspotPaths.imports(), formData, {
      headers: { ...formData.getHeaders() },
    });
    return { data };
  },
  inputs: importCRMDataInputs,
  examplePerform: async () => ({
    data: importCRMDataExamplePayload.data,
  }),
  examplePayload: importCRMDataExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: importSchema }),
});
