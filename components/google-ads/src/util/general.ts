import { type ActionLogger, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION,
  GOOGLE_DATA_MANAGER_API_VERSION,
  GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION,
} from "../constants";

export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};



export const cleanCustomerId = (value: unknown): string => {
  const id = util.types.toString(value);
  return id.replace("customers/", "").replace(/-/g, "");
};

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value
      .map((v) => `customer_id:${cleanCustomerId(v)}`)
      .toString()
      .replaceAll(",", ";");
  }
  return undefined;
};

export const getCustomerDescriptiveName = async (
  client: HttpClient,
  customerId: string,
): Promise<string> => {
  const NO_DESCRIPTIVE_NAME = "(No descriptive name)";
  try {
    
    const { data } = await client.post(
      `/customers/${customerId}/googleAds:search`,
      {
        query: "SELECT customer.descriptive_name FROM customer",
      },
    );
    
    if (data?.results[0]?.customer) {
      return data.results[0].customer?.descriptiveName || NO_DESCRIPTIVE_NAME;
    }

    return NO_DESCRIPTIVE_NAME;
  } catch (_error) {
    
    return "No Description";
  }
};


export const formatAccountNumber = (accountNumber: string) => {
  try {
    const reg = /^(\d{3})(\d{3})(\d{4})$/;
    const match = reg.exec(accountNumber);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
  } catch {
    return accountNumber;
  }
  return accountNumber;
};

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalInt = (value: unknown) =>
  value ? util.types.toInt(value) : undefined;

export const toStringList = (value: unknown) => {
  if (value && Array.isArray(value)) {
    return value as string[];
  }
  return [];
};

export const validateApiVersion = (
  apiVersion: string,
  logger: ActionLogger,
): string => {
  if (!apiVersion) {
    return GOOGLE_ADS_API_VERSION;
  }

  const versionRegex = /^v(\d+)$/;
  const match = apiVersion.match(versionRegex);

  if (!match) {
    throw new Error(
      `Invalid API version format: ${apiVersion}. Expected format: v{number} (e.g., v21, v22)`,
    );
  }

  const versionNumber = util.types.toInt(match[1]);
  const minimumVersionNumber = util.types.toInt(
    GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION.replace("v", ""),
  );

  if (versionNumber < minimumVersionNumber) {
    logger.warn(
      `The connection API version ${apiVersion} is configured below the minimum supported version. Version ${GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION} will be used to prevent errors.`,
    );

    return GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION;
  }

  return apiVersion;
};

export const validateDataManagerApiVersion = (
  apiVersion: string,
  logger: ActionLogger,
): string => {
  if (!apiVersion) {
    return GOOGLE_DATA_MANAGER_API_VERSION;
  }

  const versionRegex = /^v(\d+)$/;
  const match = apiVersion.match(versionRegex);

  if (!match) {
    throw new Error(
      `Invalid Data Manager API version format: ${apiVersion}. Expected format: v{number} (e.g., v1)`,
    );
  }

  const versionNumber = util.types.toInt(match[1]);
  const minimumVersionNumber = util.types.toInt(
    GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION.replace("v", ""),
  );

  if (versionNumber < minimumVersionNumber) {
    logger.warn(
      `The Data Manager API version ${apiVersion} is configured below the minimum supported version. Version ${GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION} will be used to prevent errors.`,
    );

    return GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION;
  }

  return apiVersion;
};
