import { action, util } from "@prismatic-io/spectral";
import { connectionInput, recordType, requestBodyCode } from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const createRecord = action({
  display: {
    label: "Create Record",
    description:
      "Creates a new record in SAP S/4HANA OData V2. For OData V4 APIs, use Raw Request.",
  },
  perform: async (_, { connectionInput, requestBodyCode, recordType }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.post(`/sap/opu/data/odata/sap/${recordType}`, requestBodyCode);

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
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
    },
  },
});
