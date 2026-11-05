import { action, util } from "@prismatic-io/spectral";
import {
  filter,
  inlinecount,
  connectionInput,
  skip,
  top,
  orderBy,
  select,
  expand,
  recordType,
} from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const listRecords = action({
  display: {
    label: "List Records",
    description:
      "Retrieve a list of records from SAP S/4HANA OData V2. For OData V4 APIs, use Raw Request.",
  },
  perform: async (
    _,
    { top, expand, skip, filter, inlinecount, orderBy, select, connectionInput, recordType },
  ) => {
    const headers = {
      Accept: "application/json",
    };
    const params = {
      $top: top || undefined,
      $skip: skip || undefined,
      $filter: filter || undefined,
      $inlinecount: inlinecount || undefined,
      $orderby: orderBy || undefined,
      $select: select || undefined,
      $expand: expand || undefined,
    };

    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(`/sap/opu/odata/sap/${recordType}`, {
        params,
      });

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
    orderBy,
    select,
    expand,
    recordType,
  },
});
