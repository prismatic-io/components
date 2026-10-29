import { action } from "@prismatic-io/spectral";
import { createClient, validateV1Connection } from "../../client";
import {
  companyId,
  connectionInput,
  file,
  fileName,
  payEntryInput,
} from "../../inputs";
import { objectToFormData } from "../../util";

export const createPayEntry = action({
  display: {
    label: "Create Pay Entry",
    description: "Create a new Pay Entry Import",
  },
  inputs: {
    connectionInput,
    companyId,
    file,
    fileName,
    payEntryInput,
  },
  perform: async (
    context,
    { connectionInput, companyId, file, fileName, payEntryInput },
  ) => {
    validateV1Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data: fileData, contentType } = file;

    const formData = objectToFormData(payEntryInput);
    formData.append("file", fileData, { contentType, filename: fileName });

    const { data } = await client.post(
      `/payroll/v1/companies/${companyId}/payEntryImport`,
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
