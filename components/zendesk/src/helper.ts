import { util } from "@prismatic-io/spectral";

const validPriorities = new Set(["high", "low", "urgent"]);

export const isPriority = (input: string | undefined) =>
  input && validPriorities.has(input);

const validStatus = new Set([
  "closed",
  "hold",
  "new",
  "open",
  "pending",
  "solved",
]);

export const isStatus = (input: string | undefined) =>
  input && validStatus.has(input);

const validType = new Set(["incident", "problem", "question", "task"]);

export const isType = (input: string | undefined) =>
  input && validType.has(input);

const validRoles = new Set(["admin", "agent", "end-user"]);

export const isRole = (input: string) => validRoles.has(input);

interface ValidateCommentParams {
  bodyValue: unknown;
  htmlValue: unknown;
  attachment?: Record<string, Record<string, unknown>>;
}

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

export const cleanZendeskDomain = (input: string): string => {
  if (!input) return "";

  const final = input.trim();

  
  
  
  
  
  
  const match = final.match(/([a-zA-Z0-9-]+)\.zendesk\.com/i);

  if (match?.[1]) {
    return `https://${match[1]}.zendesk.com`;
  }

  
  if (/^[a-zA-Z0-9-]+$/.test(final)) {
    return `https://${final}.zendesk.com`;
  }

  
  return final;
};
