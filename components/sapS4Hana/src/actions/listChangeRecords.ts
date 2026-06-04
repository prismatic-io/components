import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import {
  connectionInput,
  top,
  skip,
  filter,
  inlinecount,
  changeRecordOrderBy,
  changeRecordSelect,
  changeRecordExpand,
} from "../inputs";

export const listChangeRecords = action({
  display: {
    label: "List Change Records",
    description: "Retrieves the list of change records in the system.",
  },
  perform: async (
    _context,
    {
      connectionInput,
      top,
      skip,
      filter,
      inlinecount,
      changeRecordOrderBy,
      changeRecordSelect,
      changeRecordExpand,
    },
  ) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    
    
    const orderByArr = changeRecordOrderBy as unknown as string[];
    const selectArr = changeRecordSelect as unknown as string[];
    const expandArr = changeRecordExpand as unknown as string[];

    try {
      const { data } = await client.get(
        `/sap/opu/odata/sap/API_CHANGE_RECORD/A_ChangeRecord?${
          top.length ? `$top=${top}&` : ""
        }${skip.length ? `$skip=${skip}&` : ""}${
          filter.length ? `$filter=${filter}&` : ""
        }${inlinecount.length ? `$inlinecount=${inlinecount}&` : ""}${
          orderByArr.length ? `$orderby=${orderByArr.join(",")}&` : ""
        }${selectArr.length ? `$select=${selectArr.join(",")}&` : ""}${
          expandArr.length ? `$expand=${expandArr.join(",")}&` : ""
        }`,
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
    top,
    skip,
    filter,
    inlinecount,
    changeRecordOrderBy,
    changeRecordSelect,
    changeRecordExpand,
  },
});
