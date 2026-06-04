import { type HttpResponse, type TriggerPayload, util } from "@prismatic-io/spectral";
import { parse } from "fast-xml-parser";
import { WEBHOOK_SFDC_RESPONSE } from "../constants";
import type { SalesforceOutboundEnvelope } from "../types";
import { getNotificationsArray } from "./cleanFunctions";

export const performTriggerFunction = async (_context, payload) => {
  const response: HttpResponse = WEBHOOK_SFDC_RESPONSE;

  const finalPayload: TriggerPayload = { ...payload };

  const parseOptions = {
    ignoreAttributes: false,
    ignoreNameSpace: false,
    textNodeName: "_text",
  };

  
  finalPayload.body.data = parse(util.types.toString(finalPayload.body.data), parseOptions) || {};
  finalPayload.body.contentType = undefined;

  return Promise.resolve({
    payload: finalPayload,
    response,
  });
};

export const performFlowOutboundMessageTriggerFunction = async (_context, payload) => {
  const response: HttpResponse = WEBHOOK_SFDC_RESPONSE;

  const finalPayload: TriggerPayload = { ...payload };

  const parseOptions = {
    ignoreAttributes: false,
    ignoreNameSpace: false,
    textNodeName: "_text",
  };

  const parsedBody = (parse(util.types.toString(finalPayload.body.data), parseOptions) ||
    {}) as SalesforceOutboundEnvelope;

  const notificationsArray = getNotificationsArray(parsedBody);

  
  finalPayload.body = { data: notificationsArray, contentType: "application/json; charset=utf-8" };

  return Promise.resolve({
    payload: finalPayload,
    response,
  });
};
