import { action, input, util } from "@prismatic-io/spectral";
import { connectionInput, filter, inlinecount, recordId, recordType, skip, top } from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const getRecord = action({
  display: {
    label: "Get Record",
    description:
      "Retrieve a single record from SAP S/4HANA OData V2. For OData V4 APIs, use Raw Request.",
  },
  perform: async (
    _,
    {
      expand,
      select,
      connectionInput,
      recordId,
      recordType,
      orderBy,
      top,
      skip,
      filter,
      inlinecount,
    },
  ) => {
    const headers = {
      Accept: "application/json",
    };

    const params = {
      $expand: expand || undefined,
      $select: select || undefined,
      $orderby: orderBy || undefined,
      $top: top || undefined,
      $skip: skip || undefined,
      $filter: filter || undefined,
      $inlinecount: inlinecount || undefined,
    };

    const client = getSapClient(connectionInput, headers);
    try {
      const url = `/sap/opu/odata/sap/${recordType}('${recordId}')`;
      const { data } = await client.get(url, {
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
    recordType,
    recordId,
    top,
    skip,
    filter,
    inlinecount,
    orderBy: input({
      label: "Order By",
      type: "string",
      comments: "Order items by property value",
      required: false,
      clean: util.types.toString,
    }),
    select: input({
      label: "Select",
      type: "string",
      comments: "Select property to be returned",
      required: false,
      clean: util.types.toString,
    }),
    expand: input({
      label: "Expand",
      type: "string",
      comments: "Expand related entities",
      required: false,
      clean: util.types.toString,
    }),
  },
});
