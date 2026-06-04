import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { uploadFileInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to Salesforce ContentVersion.",
  },
  inputs: uploadFileInputs,
  perform: async (context, { version, connection, file, pathOnClient }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        file,
        pathOnClient,
      });
    }
    const { data } = file;

    const response = await salesforceClient.sobject("ContentVersion").create({
      PathOnClient: pathOnClient,
      VersionData: data.toString("base64"),
    });
    return {
      data: response,
    };
  },
  examplePayload: genericCreateUpdateExamplePayload,
});
