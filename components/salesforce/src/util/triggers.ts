import {
  type HttpResponse,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import { WEBHOOK_SFDC_RESPONSE } from "../constants";
import type { SalesforceOutboundEnvelope } from "../types";
import { getNotificationsArray } from "./cleanFunctions";
import { parseXml } from "./xml";

export const performTriggerFunction = async (_context, payload) => {
  const response: HttpResponse = WEBHOOK_SFDC_RESPONSE;

  const finalPayload: TriggerPayload = { ...payload };

  finalPayload.body.data = parseXml(
    util.types.toString(finalPayload.body.data),
  );
  finalPayload.body.contentType = undefined;

  return Promise.resolve({
    payload: finalPayload,
    response,
  });
};

export const performFlowOutboundMessageTriggerFunction = async (
  _context,
  payload,
) => {
  const response: HttpResponse = WEBHOOK_SFDC_RESPONSE;

  const finalPayload: TriggerPayload = { ...payload };

  const parsedBody = parseXml(
    util.types.toString(finalPayload.body.data),
  ) as SalesforceOutboundEnvelope;

  const notificationsArray = getNotificationsArray(parsedBody);

  finalPayload.body = {
    data: notificationsArray,
    contentType: "application/json; charset=utf-8",
  };

  return Promise.resolve({
    payload: finalPayload,
    response,
  });
};
