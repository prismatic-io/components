import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getConnectionProps } from "../../auth";
import { rawRequestInputs } from "../../inputs";
import { rawRequestExamplePayload } from "../../examplePayloads";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Zendesk.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...httpInputValues }) => {
    const { token, oauth, remoteUri } = getConnectionProps({
      zendeskConnection: connection,
    });
    const { data } = await sendRawRequest(
      remoteUri as string,
      { ...httpInputValues, debugRequest: context.debug.enabled },
      { authorization: oauth ? `Bearer ${token}` : `Basic ${token}` },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
