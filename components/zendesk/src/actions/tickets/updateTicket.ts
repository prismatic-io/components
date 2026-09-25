import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { updateTicketExamplePayload } from "../../examplePayloads";
import { updateTicketInputs } from "../../inputs";
import { updateTicketOutputSchema } from "../../outputSchemas";
import { isPriority, isStatus, isType, validateComment } from "../../util";
export const updateTicket = action({
  display: {
    label: "Update Ticket",
    description: "Update a ticket by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const ticketPriorityString = params.classification.ticketPriority;
    const ticketStatusString = params.classification.ticketStatus;
    const ticketTypeString = params.classification.ticketType;
    let attachment: Record<string, Record<string, unknown>> | undefined;
    if (params.file) {
      if (!params.fileName) {
        throw new Error("Must specify a file name when you attach a file");
      }
      attachment = (await client.attachments.upload(params.file.data, {
        filename: params.fileName,
        binary: true,
      })) as Record<string, Record<string, unknown>>;
    }
    const { result } = await client.tickets.update(
      util.types.toInt(params.ticketId),
      {
        ticket: {
          assignee_id: util.types.isInt(params.assigneeId)
            ? util.types.toInt(params.assigneeId)
            : undefined,
          assignee_email: params.assigneeEmail,
          priority: (isPriority(ticketPriorityString)
            ? ticketPriorityString
            : undefined) as undefined,
          organization_id: params.requesterOrganization,
          comment: validateComment({
            bodyValue: params.ticketComment,
            htmlValue: params.ticketCommentHTML,
            attachment,
          }),
          status: (isStatus(ticketStatusString)
            ? ticketStatusString
            : undefined) as undefined,
          tags: params.tags,
          type: (isType(ticketTypeString)
            ? ticketTypeString?.toLowerCase()
            : undefined) as undefined,
          subject: params.ticketSubject,
        },
      },
    );
    return {
      data: result,
    };
  },
  examplePerform: async (
    _context,
    params,
  ): Promise<{
    data: unknown;
  }> => {
    const {
      ticketPriority: priority,
      ticketStatus: status,
      ticketType: type,
    } = params.classification;
    const subject = params.ticketSubject;
    const organizationId = params.requesterOrganization;
    return {
      data: {
        ...updateTicketExamplePayload.data,
        ...(subject ? { subject } : {}),
        ...(isPriority(priority) ? { priority } : {}),
        ...(isStatus(status) ? { status } : {}),
        ...(isType(type) ? { type: type?.toLowerCase() } : {}),
        ...(organizationId ? { organization_id: organizationId } : {}),
        ...(util.types.isInt(params.assigneeId)
          ? { assignee_id: util.types.toInt(params.assigneeId) }
          : {}),
        ...(params.tags?.length
          ? { tags: params.tags.map((tag) => util.types.toString(tag)) }
          : {}),
      },
    };
  },
  inputs: updateTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTicketOutputSchema,
  }),
  examplePayload: updateTicketExamplePayload,
});
