import { structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import {
  assigneeEmail,
  assigneeId,
  connectionInput,
  externalId,
  file,
  fileName,
  followers,
  recipientEmail,
  requesterEmail,
  requesterName,
  requesterOrganization,
  tags,
  ticketComment,
  ticketCommentHTML,
  ticketId,
  ticketPriority,
  ticketStatus,
  ticketSubject,
  ticketType,
  userId,
} from "./common";
export const createTicketInputs = {
  requesterName,
  requesterEmail,
  assigneeId,
  recipientEmail,
  ticketSubject,
  classification: structuredObjectInput({
    label: "Classification",
    comments: "Priority, status, and type of the record.",
    inputs: { ticketPriority, ticketStatus, ticketType },
  }),
  ticketComment,
  ticketCommentHTML,
  tags,
  requesterOrganization,
  followers,
  zendeskConnection: connectionInput,
  externalId,
};
export const deleteTicketInputs = {
  ticketId,
  zendeskConnection: connectionInput,
};
export const getByExternalIdInputs = {
  zendeskConnection: connectionInput,
  externalId,
};
export const listTicketsInputs = {
  zendeskConnection: connectionInput,
};
export const listTicketsByUserInputs = {
  userId: {
    ...userId,
    required: true,
    clean: util.types.toNumber,
  },
  zendeskConnection: connectionInput,
};
export const listTicketsToUserInputs = {
  userId: {
    ...userId,
    required: true,
    clean: util.types.toNumber,
  },
  zendeskConnection: connectionInput,
};
export const showTicketInputs = {
  ticketId: {
    ...ticketId,
    required: true,
    clean: util.types.toNumber,
  },
  zendeskConnection: connectionInput,
};
export const updateTicketInputs = {
  ticketId,
  ticketComment,
  ticketCommentHTML,
  file,
  fileName,
  classification: structuredObjectInput({
    label: "Classification",
    comments: "Priority, status, and type of the record.",
    inputs: { ticketPriority, ticketStatus, ticketType },
  }),
  assigneeEmail: { ...assigneeEmail, required: false, clean: cleanString },
  assigneeId: { ...assigneeId, required: false },
  tags,
  ticketSubject,
  requesterOrganization,
  zendeskConnection: connectionInput,
};
