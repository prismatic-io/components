import { type Connection, util } from "@prismatic-io/spectral";
import { type ParserOptions, parseStringPromise } from "xml2js";
import { createHttpClient } from "../client";
const generateGuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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
