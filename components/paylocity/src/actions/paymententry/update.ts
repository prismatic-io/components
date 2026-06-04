import { action } from "@prismatic-io/spectral";
import { createClient, validateV1Connection } from "../../client";
import {
  companyId,
  connectionInput,
  file,
  fileName,
  payEntryInput,
  timeImportFileTrackingId,
} from "../../inputs";
import { objectToFormData } from "../../util";

export const updatePayEntry = action({
  display: {
    label: "Update Pay Entry",
    description: "Update an Pay Entry Import",
  },
  inputs: {
    connectionInput,
    companyId,
    file,
    fileName,
    timeImportFileTrackingId,
    payEntryInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      companyId,
      file,
      fileName,
      timeImportFileTrackingId,
      payEntryInput,
    },
  ) => {
    validateV1Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data: fileData, contentType } = file;

    const formData = objectToFormData(payEntryInput);
    formData.append("file", fileData, { contentType, filename: fileName });

    const { data } = await client.patch(
      `/payroll/v1/companies/${companyId}/payEntryImport/${timeImportFileTrackingId}`,
      formData.getBuffer(),
      {
        headers: formData.getHeaders(),
      },
    );
    return {
      data,
    };
  },
});
