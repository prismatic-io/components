import { action, ConnectionError, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { algoliaApiKey } from "../connections";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Algolia",
  },
  inputs: {
    algoliaConnection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/1/indexes/{indexName}), The base URL is already included (https://<CONNECTION_INPUT_APPLICATION_ID>.algolia.net). For example, to connect to https://<CONNECTION_INPUT_APPLICATION_ID>.algolia.net/1/indexes/{indexName}, only /1/indexes/{indexName} is entered in this field.",
      example: "/1/indexes/{indexName}",
    },
  },
  perform: async (context, { algoliaConnection, ...rawRequestInputs }) => {
    if (!algoliaConnection || algoliaConnection.key !== algoliaApiKey.key) {
      if (!algoliaConnection) {
        throw new Error("No connection provided");
      }
      throw new ConnectionError(
        algoliaConnection,
        `Unsupported authorization method ${algoliaConnection.key}.`,
      );
    }

    const { applicationID, apiKey } = algoliaConnection.fields;

    if (typeof applicationID !== "string" || typeof apiKey !== "string") {
      throw new Error("applicationID and apiKey must be strings");
    }
    if (typeof applicationID !== "string" || typeof apiKey !== "string") {
      throw new Error("Invalid application ID or API key.");
    }
    try {
      const baseUrl = `https://${applicationID}.algolia.net`;
      const { data } = await sendRawRequest(
        baseUrl,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          "X-Algolia-Application-Id": applicationID,
          "X-Algolia-API-Key": apiKey,
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequest;
