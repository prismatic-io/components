import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { lookup } from "mime-types";
import { getFileInputs } from "../../inputs";
import { getFileExamplePayload } from "../../examplePayloads";

export const getFile = action({
  display: {
    label: "Get File",
    description: "Retrieve a file from Salesforce ContentVersion.",
  },
  inputs: getFileInputs,
  perform: async (context, { version, connection, contentDocumentId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    
    const { data: metadata } = await salesforceClient.get(
      `/sobjects/ContentVersion/${contentDocumentId}`,
    );

    
    const { data } = await salesforceClient.get(
      `/sobjects/ContentVersion/${contentDocumentId}/VersionData`,
      {
        responseType: "arraybuffer",
      },
    );

    return {
      data,
      contentType: lookup(metadata.FileType) || "application/octet-stream",
    };
  },
  examplePayload: getFileExamplePayload,
});
