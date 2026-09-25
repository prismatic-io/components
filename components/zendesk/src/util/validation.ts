import { util } from "@prismatic-io/spectral";
import {
  ticketPriorities,
  ticketStatuses,
  ticketTypes,
  userRoles,
} from "../constants";
import type { ValidateCommentParams } from "../types";
const validPriorities = new Set<string>(ticketPriorities);
const validStatus = new Set<string>(ticketStatuses);
const validType = new Set<string>(ticketTypes);
const validRoles = new Set<string>(userRoles);
export const isPriority = (input: string | undefined) =>
  input && validPriorities.has(input);
export const isStatus = (input: string | undefined) =>
  input && validStatus.has(input);
export const isType = (input: string | undefined) =>
  input && validType.has(input.toLowerCase());
export const isRole = (input: string | undefined) =>
  input && validRoles.has(input);
export const validateComment = ({
  bodyValue,
  htmlValue,
  attachment,
}: ValidateCommentParams) => {
  const body = util.types.toString(bodyValue);
  const html = util.types.toString(htmlValue);
  const resp: Record<string, unknown> = {};
  if (attachment) {
    resp.uploads = [attachment?.upload?.token];
  }
  if (body) {
    resp.body = body;
  }
  if (html) {
    resp.html_body = html;
  }
  return resp;
};
