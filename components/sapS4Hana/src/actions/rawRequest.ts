import { action, util } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { getAuthHeaders, getBaseUrl } from "../util";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to SAP S/4HANA",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only. The base URL from your connection is automatically prepended. For example: /sap/opu/odata4/sap/api_purchaseorder_2/srvd_a2x/sap/purchaseorder/0001/PurchaseOrder",
      example:
        "/sap/opu/odata4/sap/api_purchaseorder_2/srvd_a2x/sap/purchaseorder/0001/PurchaseOrder",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    try {
      const { data, headers } = await sendRawRequest(
        getBaseUrl(connection),
        {
          ...rawRequestInputs,
          debugRequest: context.debug.enabled,
        },
        getAuthHeaders(connection),
      );
      return { data: { data, headers } };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequest;
