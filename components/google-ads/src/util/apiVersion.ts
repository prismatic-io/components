import { type ActionLogger, util } from "@prismatic-io/spectral";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION,
  GOOGLE_DATA_MANAGER_API_VERSION,
  GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION,
} from "../constants";
const validateVersionAgainstFloor = (
  apiVersion: string,
  logger: ActionLogger,
  options: {
    defaultVersion: string;
    minimumVersion: string;
    invalidFormatMessage: string;
    belowMinimumMessage: string;
  },
): string => {
  if (!apiVersion) {
    return options.defaultVersion;
  }
  const versionRegex = /^v(\d+)$/;
  const match = apiVersion.match(versionRegex);
  if (!match) {
    throw new Error(options.invalidFormatMessage);
  }
  const versionNumber = util.types.toInt(match[1]);
  const minimumVersionNumber = util.types.toInt(
    options.minimumVersion.replace("v", ""),
  );
  if (versionNumber < minimumVersionNumber) {
    logger.warn(options.belowMinimumMessage);
    return options.minimumVersion;
  }
  return apiVersion;
};
export const validateApiVersion = (
  apiVersion: string,
  logger: ActionLogger,
): string =>
  validateVersionAgainstFloor(apiVersion, logger, {
    defaultVersion: GOOGLE_ADS_API_VERSION,
    minimumVersion: GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION,
    invalidFormatMessage: `Invalid API version format: ${apiVersion}. Expected format: v{number} (e.g., v24, v25)`,
    belowMinimumMessage: `The connection API version ${apiVersion} is configured below the minimum supported version. Version ${GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION} will be used to prevent errors.`,
  });
export const validateDataManagerApiVersion = (
  apiVersion: string,
  logger: ActionLogger,
): string =>
  validateVersionAgainstFloor(apiVersion, logger, {
    defaultVersion: GOOGLE_DATA_MANAGER_API_VERSION,
    minimumVersion: GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION,
    invalidFormatMessage: `Invalid Data Manager API version format: ${apiVersion}. Expected format: v{number} (e.g., v1)`,
    belowMinimumMessage: `The Data Manager API version ${apiVersion} is configured below the minimum supported version. Version ${GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION} will be used to prevent errors.`,
  });
