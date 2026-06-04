import { action } from "@prismatic-io/spectral";
import {
  inputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getConnectionProps } from "../../auth";
import { rawRequestPayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Zendesk.",
  },
  inputs: {
    connection: connectionInput,
    ...(inputs as Omit<typeof inputs, "debugRequest">),
    url: {
      ...inputs.url,
      comments:
        "Input the path only (/users), The base URL is already included with your proper Zendesk domain (https://YOUR-ZENDESK-DOMAIN.zendesk.com/api/v2). For example, to connect to https://YOUR-ZENDESK-DOMAIN.zendesk.com/api/v2/users, only /users is entered in this field.",
      example: "/users",
    },
  },
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
  examplePayload: {
    data: rawRequestPayload,
  },
});
