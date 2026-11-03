import { type Connection, util } from "@prismatic-io/spectral";

export const getAccessToken = (connection: Connection) => {
  return util.types.toString(connection?.token?.access_token);
};

export const getBaseUrl = (connection: Connection) => {
  const isSandboxEnvironment = util.types.toBool(
    connection.fields.isSandboxEnvironment,
  );
  const spAPIEndpoints = util.types.toString(connection?.fields?.region);
  if (!spAPIEndpoints) {
    throw new Error("Region is required");
  }
  if (isSandboxEnvironment) {
    return `sandbox.${spAPIEndpoints}`;
  }
  return spAPIEndpoints;
};

export const getHeaders = (baseUrl: string, accessToken: string) => {
  return {
    "x-amz-access-token": accessToken,
    "x-amz-date": new Date().toISOString(),
    host: baseUrl,
    "user-agent": "prismatic-io/1.0 (Language=JavaScript; Platform=NodeJS)",
    "content-type": "application/json",
    accept: "application/json",
  };
};
