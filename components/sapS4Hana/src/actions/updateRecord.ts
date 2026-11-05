import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput, recordId, recordType } from "../inputs";
import { UPDATE_PURCHASE_REQUISITION_DEFAULT_VALUE } from "../constants";

export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Updates an existing record in SAP S/4HANA.",
  },
  perform: async (_context, { requestBodyCode, connectionInput, recordType, recordId }) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.patch(
        `/sap/opu/odata/sap/${recordType}('${recordId}')`,
        requestBodyCode,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      example: JSON.stringify(UPDATE_PURCHASE_REQUISITION_DEFAULT_VALUE),
    },
    connectionInput,
    recordType,
    recordId,
  },
});
