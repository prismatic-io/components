import https from "node:https";
import { type Connection, util } from "@prismatic-io/spectral";
import type { ActionContext } from "@prismatic-io/spectral/dist/serverTypes";
import axios, { type AxiosInstance } from "axios";
import type { ConsumerApplicationSubscription, PersistedToken } from "./types";
import {
  cleanCertificateValue,
  getBaseUrl,
  getTokenEndpoint,
  validateConnection,
} from "./util";

export const createClient = async (
  context: ActionContext,
  connection: Connection,
  debug: boolean,
): Promise<AxiosInstance> => {
  validateConnection(connection);
  const { sslCert, sslKey } = connection.fields;
  const { accessToken } = await fetchToken(context, connection, debug);

  
  const baseUrl = getBaseUrl(connection);
  const axiosClient = createCertClient(sslCert, sslKey, baseUrl, {
    Authorization: `Bearer ${accessToken}`,
    roleCode: "practitioner",
  });

  addInterceptorsToClient(axiosClient, context, debug);

  return axiosClient;
};

export const fetchToken = async (
  context: ActionContext,
  connection: Connection,
  debug: boolean,
): Promise<PersistedToken> => {
  const { clientId, clientSecret, sslCert, sslKey, subscriberOrganizationOID } =
    connection.fields;

  const executionStateKey = `ADP - ${connection.configVarKey}`;
  const baseUrl = getBaseUrl(connection);
  const tokenEndpoint = getTokenEndpoint(connection);

  let accessToken = "";
  let expiresDate = 0;

  const persistedToken = context.executionState[
    executionStateKey
  ] as PersistedToken;
  const now = Date.now() / 1000;
  if (persistedToken) {
    if (now <= persistedToken.expiresDate) {
      accessToken = persistedToken.accessToken;
      expiresDate = persistedToken.expiresDate;
    }
  }
  if (!accessToken) {
    
    const tokenClient = createCertClient(sslCert, sslKey, baseUrl);
    addInterceptorsToClient(tokenClient, context, debug);

    if (subscriberOrganizationOID) {
      const accessTokenData = await getAccessToken(
        tokenClient,
        tokenEndpoint,
        clientId,
        clientSecret,
      );

      
      const suscribedOrgClient = createCertClient(sslCert, sslKey, baseUrl, {
        Authorization: `Bearer ${accessTokenData.access_token}`,
      });
      addInterceptorsToClient(suscribedOrgClient, context, debug);

      const suscriberData = await getSubscriberApplicationCredentials(
        suscribedOrgClient,
        subscriberOrganizationOID,
      );

      const { subscriberClientId, subscriberClientSecret } =
        getSubscribersClientIdAndSecret(
          suscriberData,
          subscriberOrganizationOID,
        );

      
      const apiAccessToken = await getAccessToken(
        tokenClient,
        tokenEndpoint,
        subscriberClientId,
        subscriberClientSecret,
      );
      const { access_token, expires_in } = apiAccessToken;
      accessToken = access_token;
      expiresDate = now + expires_in;
    } else {
      
      const apiAccessToken = await getAccessToken(
        tokenClient,
        tokenEndpoint,
        clientId,
        clientSecret,
      );
      const { access_token, expires_in } = apiAccessToken;
      accessToken = access_token;
      expiresDate = now + expires_in;
    }
  }

  const newState: PersistedToken = { accessToken, expiresDate };

  context.executionState[executionStateKey] = newState;

  return { accessToken, expiresDate };
};

export const addInterceptorsToClient = (
  client: AxiosInstance,
  context: ActionContext,
  debug = false,
) => {
  if (!debug) {
    return;
  }
  client.interceptors.response.use((response) => {
    context.logger.debug("response", response);
    return response;
  });
  client.interceptors.request.use((request) => {
    context.logger.debug("request", request);
    return request;
  });
};

const getAccessToken = async (
  client: AxiosInstance,
  tokenEndpoint: unknown,
  clientId: unknown,
  clientSecret: unknown,
) => {
  const { data } = await client.post(
    util.types.toString(tokenEndpoint),
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "client_credentials",
        client_id: util.types.toString(clientId),
        client_secret: util.types.toString(clientSecret),
      },
    },
  );
  return data;
};

const createCertClient = (
  sslCert: unknown,
  sslKey: unknown,
  baseUrl: string | undefined = undefined,
  headers: Record<string, string> = {},
): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    headers,
    httpsAgent: new https.Agent({
      rejectUnauthorized: true,
      cert: cleanCertificateValue(sslCert),
      key: cleanCertificateValue(sslKey),
    }),
  });
};

const getSubscriberApplicationCredentials = async (
  client: AxiosInstance,
  subscriberOrganizationOID: unknown,
) => {
  const body: Record<string, Record<string, unknown>[]> = {
    events: [
      {
        serviceCategoryCode: {
          codeValue: "core",
        },
        eventNameCode: {
          codeValue: "consumer-application-subscription-credential.read",
        },
        data: {
          transform: {
            queryParameter: `$filter=subscriberOrganizationOID eq '${subscriberOrganizationOID}'`,
          },
        },
      },
    ],
  };
  const { data } = await client.post(
    "/events/core/v1/consumer-application-subscription-credentials.read",
    body,
  );
  return data;
};

const getSubscribersClientIdAndSecret = (
  data: ConsumerApplicationSubscription,
  subscriberOrganizationOID: unknown,
) => {
  const credentials =
    data.events[0].data.output.consumerApplicationSubscriptionCredentials.find(
      (credentials) =>
        credentials.subscriberOrganizationOID ===
        util.types.toString(subscriberOrganizationOID),
    );
  if (!credentials) {
    throw new Error(
      "Could not find credentials for a Subscriber Organization.",
    );
  }
  const { clientID, clientSecret } = credentials;
  return {
    subscriberClientId: clientID,
    subscriberClientSecret: clientSecret,
  };
};

export const createSimpleClient = async (connection: Connection) => {
  validateConnection(connection);
  const { sslCert, sslKey, clientId, clientSecret } = connection.fields;
  const baseUrl = getBaseUrl(connection);
  const tokenEndpoint = getTokenEndpoint(connection);

  
  const tokenClient = axios.create({
    baseURL: baseUrl,
    httpsAgent: new https.Agent({
      rejectUnauthorized: true,
      cert: cleanCertificateValue(sslCert),
      key: cleanCertificateValue(sslKey),
    }),
  });

  
  const { data: tokenData } = await tokenClient.post(
    util.types.toString(tokenEndpoint),
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "client_credentials",
        client_id: util.types.toString(clientId),
        client_secret: util.types.toString(clientSecret),
      },
    },
  );

  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      roleCode: "practitioner",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: true,
      cert: cleanCertificateValue(sslCert),
      key: cleanCertificateValue(sslKey),
    }),
  });
};
