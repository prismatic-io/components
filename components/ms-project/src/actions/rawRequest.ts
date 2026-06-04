import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { URL } from "url";
import { validateConnection } from "../client";
import { connection } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Project",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/ProjectServer/Projects(guid'9840c3b6-ac3d-ec11-bea0-00155d788e0a')), The base URL is already included ({pwaSite}/sites/pwa/_api). For example, to connect to {pwaSite}/sites/pwa/_api/ProjectServer/Projects(guid'9840c3b6-ac3d-ec11-bea0-00155d788e0a'), only /ProjectServer/Projects(guid'9840c3b6-ac3d-ec11-bea0-00155d788e0a') is entered in this field.",
      example: "/ProjectServer/Projects(guid'9840c3b6-ac3d-ec11-bea0-00155d788e0a')",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);

    const url = new URL("/sites/pwa/_api", util.types.toString(connection.fields.pwaSite));

    const { data } = await sendRawRequest(
      url.toString(),
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${connection.token?.access_token}`,
        Accept: "application/json;odata=verbose",
      },
    );
    return { data };
  },
});

export default rawRequest;
