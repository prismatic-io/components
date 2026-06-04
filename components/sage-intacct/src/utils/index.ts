import { type Connection, util } from "@prismatic-io/spectral";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { createHttpClient, createSdkClient } from "../client";
import type { IFunction } from "@intacct/intacct-sdk/dist/Functions";
import { type ParserOptions, parseStringPromise } from "xml2js";
import type { Result } from "@intacct/intacct-sdk/dist/Xml/Response";
import type { SageApiResponse } from "../interfaces";

export * from "./queryRecordsPaginated";
export * from "./filterByTimestamp";

export const executeAction = async (
  connection: Connection,
  action: IFunction,
) => {
  const client = createSdkClient(connection);
  const actionResponse = await client.execute(action);

  return actionResponse.getResult();
};

export const generateGuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function convertResultToGenericObject(
  resultInstance: Result,
): Record<string, unknown> {
  const jsonString = JSON.stringify(resultInstance);
  const genericObject: Record<string, unknown> = JSON.parse(jsonString);

  return genericObject;
}

export const assignParametersToObject = (
  // biome-ignore lint/suspicious/noExplicitAny: For backwards compatibility
  objectToModify: any,
  // biome-ignore lint/suspicious/noExplicitAny: For backwards compatibility
  objectAttributes: Record<string, any>,
) => {
  for (const key in objectAttributes) {
    const value = objectAttributes[key];
    switch (typeof value) {
      case "string":
        if (value.length > 0) {
          objectToModify[key] = value;
        }
        break;
      case "number":
        if (value > 0) {
          objectToModify[key] = value;
        }
        break;
      case "object":
        if (Array.isArray(value) && value.length > 0) {
          objectToModify[key] = value;
        }
        break;
      case "boolean":
        objectToModify[key] = value;
        break;
      default:
        break;
    }
  }
};

export const getXmlBoilerplate = (action: string, connection: Connection) => {
  
  const currentDate = new Date();

  
  const timestamp = currentDate.getTime();

  const senderId = connection.fields.senderId;
  const senderPassword = connection.fields.senderPassword;
  const userId = connection.fields.userId;
  const companyId = connection.fields.companyId;
  const userPassword = connection.fields.userPassword;
  const guid = generateGuid();
  const entityId = util.types.toString(connection.fields.entityId);

  const data = `<?xml version="1.0" encoding="UTF-8"?>
  <request>
      <control>
          <senderid>${senderId}</senderid>
          <password>${senderPassword}</password>
          <controlid>${timestamp}</controlid>
          <uniqueid>false</uniqueid>
          <dtdversion>3.0</dtdversion>
          <includewhitespace>false</includewhitespace>
      </control>
      <operation>
          <authentication>
              <login>
                  <userid>${userId}</userid>
                  <companyid>${companyId}</companyid>
                  <password>${userPassword}</password>
                  ${entityId ? `<locationid>${entityId}</locationid>` : ""}
              </login>
          </authentication>
          <content>
              <function controlid="${guid}">
                  ${action}
              </function>
          </content>
      </operation>
  </request>`;
  
  return data.replace(/&/g, "&amp;");
};

export const executeXmlRequest = async (
  connection: Connection,
  action: string,
  debug: boolean,
  parserOptions?: ParserOptions,
) => {
  const client = createHttpClient(connection, { debug });
  const toSend = getXmlBoilerplate(action, connection);
  const response = await client.post("/", toSend, {
    maxBodyLength: Number.POSITIVE_INFINITY,
  });
  const xml = response.data;
  return parseStringPromise(xml, parserOptions);
};

export const getDateXmlTags = (date: string, wrappingTag: string) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

  if (!dateRegex.test(date)) throw new Error("Invalid date format.");

  const dateParts = date.split("/");
  const month = dateParts[0];
  const day = dateParts[1];
  const year = dateParts[2];

  return `<${wrappingTag}>
    <year>${year}</year>
    <month>${month}</month>
    <day>${day}</day>
  </${wrappingTag}>`;
};

export const getXmlTagOrEmptyString = (
  attributeName: string,
  attributeValue: string,
) => {
  const NO_CHARACTERS = 0;
  return attributeValue.length > NO_CHARACTERS
    ? `<${attributeName}>${attributeValue}</${attributeName}>`
    : "";
};

export const cleanFunctionForXml = (xml: unknown) => {
  const xmlString = util.types.toString(xml);

  return xmlString.replace(/&/g, "&amp;");
};

export const getObjectFromArray = (possibleArray: unknown) => {
  if (Array.isArray(possibleArray)) {
    return possibleArray[0];
  }

  return null;
};

export const checkSuccess = (status: unknown, errorMessage: string) => {
  if (status !== "success") throw new Error(errorMessage);
};

export const cleanCodeInput = (value: unknown) =>
  value ? util.types.toObject(value) : {};

export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

export const handleSageError = (responseFromSage: SageApiResponse): void => {
  const topLevelError = responseFromSage.response?.errormessage;
  const nestedError =
    responseFromSage.response?.operation?.result?.errormessage;

  const errorMessage = topLevelError || nestedError;

  if (errorMessage) {
    throw new Error(JSON.stringify({ data: errorMessage }));
  }
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);
