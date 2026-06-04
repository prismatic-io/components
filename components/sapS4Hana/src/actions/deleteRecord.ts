import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput, recordId, recordType } from "../inputs";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description:
      "Deletes an existing record in SAP S/4HANA OData V2. For OData V4 APIs, use Raw Request.",
  },
  perform: async (_context, { connectionInput, recordType, recordId }) => {
    const headers = {
      Accept: "*/*",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.delete(`/sap/opu/odata/sap/${recordType}('${recordId}')`);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    recordType,
    recordId,
  },
});
