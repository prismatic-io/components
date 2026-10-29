import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import FormData from "form-data";

export const jsonInputClean = (value: unknown) => {
  if (typeof value === "string") {
    if (value !== null && value.trim() !== "") {
      try {
        return JSON.parse(value);
      } catch {
        throw new Error(`Invalid JSON`);
      }
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

const validateDataType = (value: unknown): boolean => {
  const type = typeof value;

  switch (type) {
    case "string":
      return value !== "" && value !== null;
    case "number":
      return !Number.isNaN(value);
    case "boolean":
      return true;
    case "object":
      if (Array.isArray(value)) {
        return true;
      }
      if (value !== null && Object.keys(value as object).length > 0) {
        return true;
      }
      return false;
    default:
      return false;
  }
};

export const generateForm = (data: Record<string, unknown>) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      formData.append(key, value);
    }
  }

  return formData;
};

const buildFormData = (formData: FormData, obj: unknown, parentKey = "") => {
  if (Array.isArray(obj)) {
    for (const element of obj) {
      buildFormData(formData, element, parentKey);
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (const key of Object.keys(obj)) {
      buildFormData(
        formData,
        (obj as Record<string, unknown>)[key],
        parentKey ? `${parentKey}.${key}` : key,
      );
    }
  } else {
    if (obj == null) {
      return;
    }

    const value =
      typeof obj === "number" || typeof obj === "boolean"
        ? obj.toString()
        : obj;
    formData.append(parentKey, value);
  }
};

export const objectToFormData = (obj: unknown) => {
  const formData = new FormData();

  buildFormData(formData, obj);

  return formData;
};

const fetchEmployee = async (
  client: HttpClient,
  companyId: string,
  pagesize: number,
  pagenumber: number,
  includetotalcount: boolean,
) =>
  await client.get(`/companies/${companyId}/employees`, {
    params: {
      pagesize: pagesize || 25,
      pagenumber: pagenumber || 0,
      includetotalcount,
    },
  });

export const fetchEmployees = async (
  client: HttpClient,
  companyId: string,
  pagesize: number,
  pagenumber: number,
  includetotalcount: boolean,
) => {
  if (pagesize !== 0) {
    const { data } = await fetchEmployee(
      client,
      companyId,
      pagesize,
      pagenumber,
      includetotalcount,
    );
    return data;
  }
  const employees = [];
  let currentPage = 0,
    continueFetching = true;
  const MAX_PAGE_SIZE = 5000;
  do {
    const { data, headers } = await fetchEmployee(
      client,
      companyId,
      MAX_PAGE_SIZE,
      currentPage,
      true,
    );
    const { "x-pcty-total-count": totalCount } = headers;
    if (data && data.length > 0) {
      employees.push(...data);
    }
    const totalPages = Math.ceil(util.types.toInt(totalCount) / MAX_PAGE_SIZE);
    if (currentPage >= totalPages) {
      continueFetching = false;
    }
    currentPage++;
  } while (continueFetching);
  return employees;
};
