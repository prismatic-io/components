import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { downloadEmployeeDocumentsExamplePayload } from "../../examplePayloads";
import { downloadEmployeeDocumentsInputs } from "../../inputs";

export const downloadEmployeeDocuments = action({
  display: {
    label: "Download Employee Documents",
    description: "Downloads a list of documents for an employee.",
  },
  perform: async (context, { connection, employeeId }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get(`/docs/people/${employeeId}`);
    return {
      data,
    };
  },
  inputs: downloadEmployeeDocumentsInputs,
  examplePayload: downloadEmployeeDocumentsExamplePayload,
});
