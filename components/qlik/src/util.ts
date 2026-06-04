import FormData from "form-data";
import {
  POLL_PAGE_SIZE,
  POLL_RESOURCE_CONFIG,
  QLIK_PAGINATION_OFFSET_PARAM,
} from "./constants";
import type {
  QlikClient,
  QlikListResponse,
  QlikPollResourceConfig,
  QlikRecord,
} from "./types";

export const jsonInputClean = (value: unknown) => {
  if (typeof value === "string") {
    if (value !== null && value.trim() !== "") {
      return JSON.parse(value);
    }
  }
  return undefined;
};

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};

export const valueListInputToString = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value.toString();
  }
  return undefined;
};

const buildFormData = (formData: FormData, obj: unknown, parentKey = "") => {
  if (Array.isArray(obj)) {
    obj.forEach((element) => {
      buildFormData(formData, element, parentKey);
    });
  } else if (typeof obj === "object" && obj !== null) {
    const record = obj as Record<string, unknown>;
    Object.keys(record).forEach((key) => {
      buildFormData(
        formData,
        record[key],
        parentKey ? `${parentKey}.${key}` : key,
      );
    });
  } else {
    if (obj == null) {
      return;
    }

    const value =
      typeof obj === "number" || typeof obj === "boolean"
        ? obj.toString()
        : (obj as string);
    formData.append(parentKey, value);
  }
};

export const objectToFormData = (obj: Record<string, unknown>) => {
  const formData = new FormData();

  buildFormData(formData, obj);

  return formData;
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value]) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  }),
);






const extractNextPath = (href: string | undefined): string | undefined => {
  if (!href) return undefined;
  const marker = "/api/v1";
  const idx = href.indexOf(marker);
  return idx >= 0 ? href.slice(idx + marker.length) : href;
};





export const fetchAllSince = async (
  client: QlikClient,
  resourceKey: string,
  _lastPolledAt: string,
): Promise<QlikRecord[]> => {
  const config = POLL_RESOURCE_CONFIG[resourceKey];
  if (!config) {
    throw new Error(`Unsupported resource type: ${resourceKey}`);
  }

  const all: QlikRecord[] = [];

  if (config.paginationStyle === QLIK_PAGINATION_OFFSET_PARAM) {
    let page = 0;
    while (true) {
      const { data } = await client.get(config.endpoint, {
        params: { page, limit: POLL_PAGE_SIZE },
      });
      const records = (data?.data ?? []) as QlikRecord[];
      all.push(...records);
      if (records.length < POLL_PAGE_SIZE) break;
      page += 1;
    }
    return all;
  }

  
  let nextPath: string | undefined = config.endpoint;
  let params: Record<string, unknown> | undefined = { limit: POLL_PAGE_SIZE };
  while (nextPath) {
    const { data } = await client.get<QlikListResponse>(nextPath, { params });
    const records = (data?.data ?? []) as QlikRecord[];
    all.push(...records);
    nextPath = extractNextPath(data?.links?.next?.href);
    
    
    params = undefined;
  }
  return all;
};







export const filterByTimestamp = (
  records: QlikRecord[],
  config: QlikPollResourceConfig,
  lastPolledAt: string,
): { created: QlikRecord[]; updated: QlikRecord[] } => {
  const created: QlikRecord[] = [];
  const updated: QlikRecord[] = [];
  const lastPolledAtDate = new Date(lastPolledAt);

  for (const record of records) {
    const createdAt = record[config.createdField];
    const updatedAt = record[config.updatedField];
    const createdAtDate =
      typeof createdAt === "string" ? new Date(createdAt) : null;
    const updatedAtDate =
      typeof updatedAt === "string" ? new Date(updatedAt) : null;
    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    if (isNew) {
      created.push(record);
      continue;
    }
    const isUpdated =
      !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;
    if (isUpdated) {
      updated.push(record);
    }
  }

  return { created, updated };
};
