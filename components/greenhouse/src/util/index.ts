import type { Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { Application } from "../types";

const validateDataType = (value: unknown) => {
  const type = typeof value;

  switch (type) {
    case "string":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "number":
      if (value === "" || Number.isNaN(value)) {
        return false;
      }
      return true;
    case "boolean":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "object":
      if (Array.isArray(value)) {
        return true; 
      } else if (value !== null && Object.keys(value).length > 0) {
        return true; 
      }
      return false;
    default:
      return false;
  }
};

export const generatePayload = (data: Record<string, unknown>) => {
  const params: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      params[key] = value;
    }
  }

  return params;
};

export const generateBasicAuth = (connection: Connection) => {
  const { username } = connection.fields;
  const buffer = new Buffer(`${username}:`);
  const bufferBase64 = buffer.toString("base64");
  const basic = `Basic ${bufferBase64}`;
  return basic;
};




export const parseNextLink = (
  linkHeader: string | undefined,
): string | null => {
  if (!linkHeader) {
    return null;
  }
  for (const part of linkHeader.split(",")) {
    const match = /<([^>]+)>\s*;\s*rel="next"/.exec(part);
    if (match) {
      return match[1];
    }
  }
  return null;
};





export const fetchAllApplicationsSince = async (
  client: HttpClient,
  lastActivityAfterIso: string,
): Promise<Application[]> => {
  const PER_PAGE = 500;
  const results: Application[] = [];
  let nextUrl: string | null = "/applications";
  let params: Record<string, string | number> | undefined = {
    per_page: PER_PAGE,
    last_activity_after: lastActivityAfterIso,
  };

  while (nextUrl) {
    const response = await client.get<Application[]>(nextUrl, { params });
    if (Array.isArray(response.data)) {
      results.push(...response.data);
    }
    nextUrl = parseNextLink(response.headers?.link as string | undefined);
    
    
    
    params = undefined;
  }

  return results;
};






export const partitionApplicationsByTimestamp = (
  applications: Application[],
  sinceDate: Date,
): { created: Application[]; updated: Application[] } => {
  const created: Application[] = [];
  const updated: Application[] = [];

  for (const application of applications) {
    const createdAt = application.created_at
      ? new Date(application.created_at)
      : null;
    const lastActivityAt = application.last_activity_at
      ? new Date(application.last_activity_at)
      : null;

    if (createdAt && createdAt > sinceDate) {
      created.push(application);
    } else if (lastActivityAt && lastActivityAt > sinceDate) {
      updated.push(application);
    } else if (!createdAt && !lastActivityAt) {
      updated.push(application);
    }
  }

  return { created, updated };
};
