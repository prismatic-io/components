import type { WorkdayEndpoint } from "../types";

const REST_API_ENDPOINT =
  /^(https:\/\/[^/?#]+)(\/[^?#]*?)?\/api\/v\d+\/([^/?#]+)\/?$/i;

export const parseRestApiEndpoint = (value: string): WorkdayEndpoint => {
  const match = REST_API_ENDPOINT.exec(value.trim());
  if (!match) {
    throw new Error(
      "The REST API Endpoint must look like https://<host>/ccx/api/v1/<tenant>. Copy it from View API Clients in Workday.",
    );
  }
  const [, origin, prefix = "", tenant] = match;
  return { baseUrl: `${origin}${prefix}`, tenant: decodeURIComponent(tenant) };
};

export const buildTokenUrl = ({ baseUrl, tenant }: WorkdayEndpoint): string =>
  `${baseUrl}/oauth2/${encodeURIComponent(tenant)}/token`;

export const buildWqlPath = (tenant: string): string =>
  `/api/wql/v1/${encodeURIComponent(tenant)}`;

export const parseReportUrl = (reportUrl: string, baseUrl: string): URL => {
  let url: URL;
  try {
    url = new URL(reportUrl);
  } catch {
    throw new Error(
      "Report URL must be a full URL, such as the one shown in Web Services > View URLs.",
    );
  }
  const { origin } = new URL(baseUrl);
  if (url.origin !== origin) {
    throw new Error(
      `Report URL must be on the connection's Workday host (${origin}).`,
    );
  }
  return url;
};
