import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { ClientType, getBaseUrl, requestHeaders } from "../client";
import { booksRawRequestExamplePayload } from "../examplePayloads/books";
import { crmRawRequestExamplePayload } from "../examplePayloads/crm";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...restHttpClientInputs } = httpClientInputs;

const crmRawRequest = action({
  display: {
    label: "CRM - Raw Request",
    description: "Send a raw HTTP request to Zoho CRM.",
  },
  inputs: {
    connection: connectionInput,
    ...restHttpClientInputs,
    url: {
      ...restHttpClientInputs.url,
      comments:
        "Input the path only (/Leads/1234567890/actions/convert), The base URL is already included (https://www.zohoapis.{api_domain}/crm/v8). For example, to connect to https://www.zohoapis.{api_domain}/crm/v8/Leads/1234567890/actions/convert, only /Leads/1234567890/actions/convert is entered in this field.",
      example: "/Leads/1234567890/actions/convert",
    },
  },
  perform: async (context, { connection, ...restHttpClientInputs }) => {
    const { data } = await sendRawRequest(
      getBaseUrl(connection, ClientType.CRM),
      { ...restHttpClientInputs, debugRequest: context.debug.enabled },
      requestHeaders(connection),
    );
    return { data };
  },
  examplePayload: crmRawRequestExamplePayload,
});

const booksRawRequest = action({
  display: {
    label: "Books - Raw Request",
    description: "Send a raw HTTP request to Zoho Books.",
  },
  inputs: {
    connection: connectionInput,
    ...restHttpClientInputs,
    url: {
      ...restHttpClientInputs.url,
      comments:
        "Input the path only (/organizations), The base URL is already included (https://www.zohoapis.{api_domain}/books/v3). For example, to connect to https://www.zohoapis.{api_domain}/books/v3/organizations, only /organizations is entered in this field.",
      example: "/organizations",
    },
  },
  perform: async (context, { connection, ...restHttpClientInputs }) => {
    const { data } = await sendRawRequest(
      getBaseUrl(connection, ClientType.BOOKS),
      { ...restHttpClientInputs, debugRequest: context.debug.enabled },
      requestHeaders(connection),
    );
    return { data };
  },
  examplePayload: booksRawRequestExamplePayload,
});

export default { crmRawRequest, booksRawRequest };
