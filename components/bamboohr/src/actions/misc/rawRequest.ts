import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to BambooHR.",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/v1/employees/directory), The base URL is already included (https://api.bamboohr.com/api/gateway.php/COMPANY_DOMAIN). For example, to connect to https://api.bamboohr.com/api/gateway.php/COMPANY_DOMAIN/v1/employees/directory, only /v1/employees/directory is entered in this field.",
      example: "/v1/employees/directory",
    },
  },
  examplePayload: rawRequestExamplePayload,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const encodedAuth = Buffer.from(`${connection.fields.apiKey}:x`).toString(
      "base64",
    );
    const { data } = await sendRawRequest(
      `https://api.bamboohr.com/api/gateway.php/${util.types.toString(
        connection.fields.companyDomain,
      )}/`,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Basic ${encodedAuth}`,
      },
    );
    return { data };
  },
});
