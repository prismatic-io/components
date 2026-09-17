import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders } from "../../client";
import { rawRequestInputs } from "../../inputs";
import { buildPayload, buildTableUrl } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to ServiceNow.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
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
  },
});
