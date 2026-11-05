import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import {
  connectionInput,
  changeRecordUuid,
  changerecordSelect,
  changerecordExpand,
} from "../inputs";

export const getChangerecord = action({
  display: {
    label: "Get Change Records",
    description:
      "Reads data of a specific change record based on its universally unique identifier (UUID).",
  },
  perform: async (
    _context,
    { connectionInput, changeRecordUuid, changerecordSelect, changerecordExpand },
  ) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(
        `/sap/opu/odata/sap/API_CHANGE_RECORD/A_ChangeRecord(guid'${changeRecordUuid}')?${
          changerecordSelect.length ? `$select=${changerecordSelect.join(",")}&` : ""
        }${changerecordExpand.length ? `$expand=${changerecordExpand.join(",")}&` : ""}`,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    changeRecordUuid,
    changerecordSelect,
    changerecordExpand,
  },
});
