import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders } from "../../client";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
  tableNameInput,
} from "../../inputs";
import { buildPayload, buildTableUrl } from "../../util";

delete httpClientInputs.url;
delete httpClientInputs.debugRequest;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to ServiceNow",
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    tableNameInput,
    sysId: {
      ...sysId,
      required: false,
    },
    ...httpClientInputs,
  },
  perform: async (
    context,
    {
      connection,
      apiVersionInput,
      tableNameInput,
      instanceUrlInput,
      sysId,
      ...httpClientInputs
    },
  ) => {
    const headers = getAuthHeaders(connection);
    const queryParams = buildPayload(
      httpClientInputs.queryParams || [],
    ) as Record<string, string>;
    const tableURL = buildTableUrl(
      apiVersionInput,
      util.types.toString(tableNameInput),
      {
        ...queryParams,
        sys_id: sysId,
      },
    );
    try {
      const { data } = await sendRawRequest(
        instanceUrlInput,
        {
          ...httpClientInputs,
          url: tableURL,
          queryParams: [],
          debugRequest: context.debug.enabled,
        },
        headers,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
