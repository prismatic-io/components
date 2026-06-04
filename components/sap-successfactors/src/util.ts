import crypto from "node:crypto";
import { URLSearchParams } from "node:url";
import { promisify } from "node:util";
import { type Connection, ConnectionError, type KeyValuePair, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { Saml20, type SamlUnassignedOpts } from "saml";
import { apiKeyAuthentication, basicAuthentication } from "./connections";
import { PAGINATION_DEFAULT_LIMIT, POLL_RESOURCE_CONFIG } from "./constants";
import type { ActionResults, ListActionResults, SAPSuccessFactorsRecord } from "./types";

export const validateConnection = (connection: Connection) => {
  if (![basicAuthentication.key, apiKeyAuthentication.key].includes(connection.key)) {
    throw new Error(`Invalid connection key: ${connection.key}`);
  }
};

export const createHashedAssertion = async (connection: Connection) => {
  const opts = getAssert(connection);

  const promise = promisify(Saml20.create);
  const assertion = await promise(opts);
  if (!assertion) {
    throw new ConnectionError(
      connection,
      `Failed to create SAML assertion, verify that you're providing a valid certificate and private key. ${JSON.stringify({ ...opts, key: connection.fields.privateKey, cert: connection.fields.cert })}`,
    );
  }

  return Buffer.from(assertion).toString("base64");
};

export const getAssert = (connection: Connection): SamlUnassignedOpts => {
  const cert = Buffer.from(util.types.toString(connection.fields.cert));
  const key = Buffer.from(util.types.toString(connection.fields.privateKey));
  const apiKey = connection.fields.apiKey;
  const server = connection.fields.apiServer;
  const user = connection.fields.user;
  const issuer = connection.fields.issuer;
  const audiences = connection.fields.audiences;
  const ttl = 3600;
  const options = {
    cert,
    key,
    issuer,
    lifetimeInSeconds: ttl,
    audiences,
    attributes: {
      api_key: apiKey,
      use_username: "true",
      external_user: "false",
    },
    nameIdentifier: user,
    sessionIndex: crypto.randomUUID(),
    recipient: `${server}/oauth/token`,
  } as SamlUnassignedOpts;
  return options;
};

export const fetchToken = async (connection: Connection, apiServer: string) => {
  const samlAssertion = await createHashedAssertion(connection);
  const companyId = util.types.toString(connection.fields.companyId);
  const apiKey = util.types.toString(connection.fields.apiKey);

  const params = new URLSearchParams();
  params.append("grant_type", "urn:ietf:params:oauth:grant-type:saml2-bearer");
  params.append("assertion", samlAssertion);
  params.append("company_id", companyId);
  params.append("client_id", apiKey);
  const tokenUrl = `${apiServer}oauth/token`;

  const client = createHttpClient({
    baseUrl: apiServer,
  });
  try {
    const { data } = await client.post(tokenUrl, params);
    return data.access_token;
  } catch (error) {
    const e = error as {
      message: string;
      response: { data: { errorMessage: string; errorHttpCode: string } };
    };
    if (e.response.data) {
      throw new Error(JSON.stringify(e.response.data));
    }
    throw e;
  }
};

export const getToken = async (connection: Connection, apiServer: string): Promise<string> => {
  validateConnection(connection);
  const { username, password, companyId } = connection.fields;

  switch (connection.key) {
    case apiKeyAuthentication.key:
      return await fetchToken(connection, apiServer);

    case basicAuthentication.key:
      return `${Buffer.from(`${username}@${companyId}:${password}`).toString("base64")}`;
    default:
      throw new Error(`Invalid connection key: ${connection.key}`);
  }
};

export const mapModelValues = (values: string[], addEmptyValue = false) => {
  if (addEmptyValue) {
    return [
      {
        value: "",
        label: "Empty",
      },
      ...values.map((value) => {
        return {
          value,
          label: value,
        };
      }),
    ];
  }
  return values.map((value) => {
    return {
      value,
      label: value,
    };
  });
};

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanCodeInput = (value: unknown) => (value ? util.types.toObject(value) : {});

export const cleanKeyValueListInput = (value: unknown) =>
  value ? util.types.keyValPairListToObject(value as KeyValuePair[]) : undefined;

export const paginateData = async (
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
) => {
  if (!fetchAll) {
    const {
      data: {
        d: { results },
      },
    }: {
      data: ListActionResults;
    } = await client.get(url, {
      params,
    });
    return results;
  }
  let records: Record<string, unknown>[] = [];
  let keepPaginating = true;
  do {
    const {
      data: {
        d: { results },
      },
    }: {
      data: ListActionResults;
    } = await client.get(url, {
      params: {
        ...params,
        $top: PAGINATION_DEFAULT_LIMIT,
        $skip: records.length,
      },
    });
    records = [...records, ...(results as Record<string, unknown>[])];
    keepPaginating = results.length === PAGINATION_DEFAULT_LIMIT;
  } while (keepPaginating);
  return records;
};

export const cleanResultFromResponse = (response: ActionResults) => {
  return response.d;
};

export const getBaseURL = (connection: Connection) => {
  const apiServer = connection.fields.apiServer;
  const environment =
    util.types.toString(apiServer) || "https://sandbox.api.sap.com/successfactors";
  try {
    const baseURL = new URL(environment);
    if (!baseURL.protocol.includes("https")) {
      baseURL.protocol = "https:";
    }
    if (baseURL.pathname !== "") {
      baseURL.pathname = "/";
    }
    return baseURL.toString();
  } catch (_error) {
    throw new Error(`The API Server is not a valid URL: ${environment}`);
  }
};

export const getProtocol = (connection: Connection) => {
  const { protocol } = connection.fields;
  return protocol;
};




export const parseSapDate = (value: unknown): Date | undefined => {
  if (typeof value !== "string" || value.length === 0) {
    return undefined;
  }
  
  const msMatch = value.match(/\/Date\((-?\d+)(?:[+-]\d{4})?\)\//);
  if (msMatch) {
    const ms = Number(msMatch[1]);
    if (!Number.isNaN(ms)) {
      return new Date(ms);
    }
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};










export const toSapFilterDatetime = (isoString: string): string => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO timestamp for SAP $filter: ${isoString}`);
  }
  
  const trimmed = date.toISOString().slice(0, 19);
  return `datetime'${trimmed}'`;
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(([value, { label }]) => ({
  label,
  value,
}));








export const filterByTimestamp = (
  records: SAPSuccessFactorsRecord[],
  lastPolledAt: string,
): { created: SAPSuccessFactorsRecord[]; updated: SAPSuccessFactorsRecord[] } => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: SAPSuccessFactorsRecord[] = [];
  const updated: SAPSuccessFactorsRecord[] = [];

  for (const record of records) {
    const createdAt = parseSapDate(record.createdDateTime);
    const isNew = createdAt !== undefined && createdAt > lastPolledAtDate;
    if (isNew) {
      created.push(record);
    } else {
      updated.push(record);
    }
  }

  return { created, updated };
};
