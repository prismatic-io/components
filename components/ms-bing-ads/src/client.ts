import { Client, createClientAsync } from "soap";
import { ConnectionError, util, Connection } from "@prismatic-io/spectral";

import { oauth } from "./connections";
import { BingAdsBaseUrl } from "./constants";
import { objectToXML } from "./util";

const namespace = "tns";

interface GetClientProps {
  connection: Connection;
  soapHeaders?: Record<string, string | number | boolean>;
  timeout?: number;
  wsdl: string;
}

export const getClient = async ({
  connection,
  soapHeaders,
  timeout = 1000,
  wsdl,
}: GetClientProps): Promise<Client> => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(
      connection,
      `Unknown connection type provided: ${connection.key}`,
    );
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received a connection without a valid access token.",
    );
  }

  if (!connection.fields?.developerToken) {
    throw new ConnectionError(
      connection,
      "Received a connection without a valid developer token.",
    );
  }

  if (!wsdl) {
    throw new Error(`WSDL is either missing or not valid.`);
  }
  const useSandbox = util.types.toBool(connection.fields.useSandbox);
  const resolvedWsdl = useSandbox
    ? wsdl.replace(BingAdsBaseUrl.Production, BingAdsBaseUrl.Sandbox)
    : wsdl;

  const client = await createClientAsync(resolvedWsdl, {
    wsdl_options: {
      timeout,
    },
  });

  client.addSoapHeader(
    {
      AuthenticationToken: util.types.toString(connection.token.access_token),
      DeveloperToken: util.types.toString(connection.fields.developerToken),
      ...soapHeaders,
    },
    undefined,
    namespace,
  );

  return client;
};

export type Arg = unknown;

export type Args = Record<string, Arg>;

interface GetMethodProps {
  args?: Args;
  client: Client;
  rawXml?: string;
  soapAction: string;
  targetNamespace?: string;
  debug?: boolean;
}

export const sendAsync = async <T>({
  args,
  client,
  rawXml,
  soapAction,
  targetNamespace,
  debug = false,
}: GetMethodProps): Promise<T> => {
  if (!soapAction) {
    throw new Error(`Soap action is either missing or not valid.`);
  }

  if (!targetNamespace && !rawXml) {
    throw new Error(
      `Target namespace is either missing or not valid, please contact developer.`,
    );
  }

  const requestBody =
    args || rawXml
      ? {
          _xml: args
            ? `
              <${namespace}:${soapAction}Request ${
                targetNamespace ? `xmlns="${targetNamespace}"` : ``
              }>
                ${objectToXML(args)}
              </${namespace}:${soapAction}Request>`
            : rawXml,
        }
      : undefined;

  client.addHttpHeader("Action", soapAction);

  if (debug) {
    console.debug("Request Body: ", requestBody);
    console.debug("SOAP Action: ", soapAction);
    console.debug("Client Options: ", client.wsdl.options);
    console.debug("Client Namespace: ", client.wsdl.definitions);
  }

  const response = await client[soapAction + `Async`](requestBody);

  return response[0] ?? undefined;
};
