import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { rawRequestInputs } from "../../inputs";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Salesforce.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, version, ...requestInputs }) => {
    const sfClient = await createSalesforceClient(connection, version);
    const baseUrl = `${sfClient.instanceUrl}/services/data/v${version}`;

    const { data } = await sendRawRequest(
      baseUrl,
      { ...requestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${sfClient.accessToken}`,
      },
    );
    return { data };
  },
  inputs: rawRequestInputs,
});
