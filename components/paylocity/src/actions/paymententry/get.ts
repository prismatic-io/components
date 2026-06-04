import { action } from "@prismatic-io/spectral";
import { createClient, validateV1Connection } from "../../client";
import {
  companyId,
  connectionInput,
  timeImportFileTrackingId,
} from "../../inputs";

export const getPayEntry = action({
  display: {
    label: "Get Pay Entry",
    description: "Retrieve a Pay Entry Import",
  },
  inputs: {
    connectionInput,
    companyId,
    timeImportFileTrackingId,
  },
  perform: async (
    context,
    { connectionInput, companyId, timeImportFileTrackingId },
  ) => {
    validateV1Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/payroll/v1/companies/${companyId}/payEntryImport/${timeImportFileTrackingId}`,
    );
    return {
      data,
    };
  },
});
