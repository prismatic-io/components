import { parseStringPromise } from "xml2js";
import { DEFAULT_DELIMITER } from "../constants";
import type { SoapItem } from "../types";

export const parseXmlResponse = async (
  xml: string,
): Promise<Record<string, unknown>> =>
  parseStringPromise(xml, { explicitArray: false, ignoreAttrs: true });


export const getResponseBody = (
  parsed: Record<string, unknown>,
): Record<string, unknown> | undefined => {
  const envelope =
    (parsed as Record<string, unknown>)?.["SOAP-ENV:Envelope"] ??
    (parsed as Record<string, unknown>)?.["soap:Envelope"];
  const body =
    (envelope as Record<string, unknown>)?.["SOAP-ENV:Body"] ??
    (envelope as Record<string, unknown>)?.["soap:Body"];
  const bodyObj = body as Record<string, unknown>;
  const responseKey = Object.keys(bodyObj || {}).find((k) =>
    k.endsWith(".Response"),
  );
  return responseKey
    ? (bodyObj?.[responseKey] as Record<string, unknown>)
    : undefined;
};


export const extractSoapFault = (
  parsed: Record<string, unknown>,
): string | undefined => {
  const envelope =
    (parsed as Record<string, unknown>)?.["SOAP-ENV:Envelope"] ??
    (parsed as Record<string, unknown>)?.["soap:Envelope"];
  const body =
    (envelope as Record<string, unknown>)?.["SOAP-ENV:Body"] ??
    (envelope as Record<string, unknown>)?.["soap:Body"];
  const fault =
    (body as Record<string, unknown>)?.["SOAP-ENV:Fault"] ??
    (body as Record<string, unknown>)?.["soap:Fault"];

  if (!fault) return undefined;

  const faultObj = fault as Record<string, unknown>;
  const faultstring = (faultObj.faultstring as string | undefined)?.trim();
  const detail = faultObj.detail as
    | Record<string, unknown>
    | string
    | undefined;

  const detailMessage = extractDetailMessage(detail);

  if (detailMessage) return detailMessage;
  if (faultstring) return faultstring;
  return "Unknown SOAP fault";
};


const extractDetailMessage = (
  detail: Record<string, unknown> | string | undefined,
): string | undefined => {
  if (!detail) return undefined;
  if (typeof detail === "string") return detail.trim() || undefined;

  
  for (const value of Object.values(detail)) {
    if (typeof value === "object" && value !== null) {
      const obj = value as Record<string, unknown>;
      const message = obj.message as string | undefined;
      const type = obj.type as string | undefined;
      if (message) {
        return type ? `[${type}] ${message}` : message;
      }
    }
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
};


export const parseHtmlResponse = (
  data: string,
): { title: string; body: string } | undefined => {
  if (typeof data !== "string") return undefined;
  const trimmed = data.trim();
  if (!trimmed.startsWith("<html") && !trimmed.startsWith("<!DOCTYPE"))
    return undefined;

  const title =
    trimmed.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const body =
    trimmed
      .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
      ?.replace(/<[^>]+>/g, "")
      .trim() ?? "";

  return { title, body };
};


export const parseAndCheckFault = async (
  xml: string,
): Promise<Record<string, unknown>> => {
  const parsed = await parseXmlResponse(xml);
  const fault = extractSoapFault(parsed);
  if (fault) {
    throw new Error(`SAP SOAP Fault: ${fault}`);
  }
  return parsed;
};

export const extractItems = (
  parsed: Record<string, unknown>,
  ...path: string[]
): SoapItem[] => {
  const response = getResponseBody(parsed);
  if (!response) return [];

  let current: unknown = response;
  for (const key of path) {
    current = (current as Record<string, unknown>)?.[key];
  }
  const items = (current as Record<string, unknown>)?.item;
  if (Array.isArray(items)) return items as SoapItem[];
  if (items) return [items as SoapItem];
  return [];
};





export const formatTableData = (
  parsed: Record<string, unknown>,
  delimiter: string = DEFAULT_DELIMITER,
): { rows: Record<string, string>[]; rowCount: number } => {
  const fields = extractItems(parsed, "FIELDS");
  const dataItems = extractItems(parsed, "DATA");

  if (fields.length === 0 || dataItems.length === 0) {
    return { rows: [], rowCount: 0 };
  }

  const fieldNames = fields.map((f) => String(f.FIELDNAME).trim());

  const rows = dataItems.map((item) => {
    const values = String(item.WA)
      .split(delimiter)
      .map((v) => v.trim());
    const row: Record<string, string> = {};
    for (let i = 0; i < fieldNames.length; i++) {
      row[fieldNames[i]] = values[i] ?? "";
    }
    return row;
  });

  return { rows, rowCount: rows.length };
};
