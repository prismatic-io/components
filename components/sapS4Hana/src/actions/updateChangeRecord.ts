import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput, changeRecordUuid } from "../inputs";

export const updateChangeRecord = action({
  display: {
    label: "Update Change Record",
    description: "Updates header attributes of the change record specified in the request.",
  },
  perform: async (_context, { requestBodyCode, connectionInput, changeRecordUuid }) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.patch(
        `/sap/opu/odata/sap/API_CHANGE_RECORD/A_ChangeRecord(guid'${changeRecordUuid}}')`,
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
      default: `{
         "d": {
         "ChangeRecord": "string",
         "ChangeRecordType": "string",
         "ChangeRecordStatus": "string",
         "ChangeNumber": "string",
         "ChangeRecordLifecycleStatus": "string",
         "Partner": "string",
         "ChgRecordDescriptionText": "string",
         "ChangeRecordDetailDescription": "string",
         "ChgRecdExpectedCompletionDate": "/Date(1492041600000)/"
         }
         }`,
    },
    connectionInput,
    changeRecordUuid,
  },
});
