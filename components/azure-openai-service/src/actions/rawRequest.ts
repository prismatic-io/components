import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...httpInputsWithoutDebug } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Send a raw HTTP request to the Azure OpenAI Service or OpenAI API",
  },
  inputs: {
    connection: connectionInput,
    ...httpInputsWithoutDebug,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/v1/images/generations), The base URL is already included (https://api.openai.com). For example, to connect to https://api.openai.com/v1/images/generations, only /v1/images/generations is entered in this field.",
      example: "/v1/images/generations",
      default: "/v1/models",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    let baseUrl = "https://api.openai.com";
    const {
      fields: { apiKey, organization },
    } = connection;

    if (!apiKey) throw new Error("API Key is required");
    if (!util.types.toBool(connection.fields.isOpenAIKey))
      baseUrl = `https://${organization}.openai.azure.com`;
    try {
      const { data } = await sendRawRequest(
        baseUrl,
        { ...httpClientInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${util.types.toString(apiKey)}`,
          "OpenAI-Organization": util.types.toString(organization),
        },
      );
      return { data };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An error occurred while sending the request");
    }
  },
});

export default { rawRequest };
