import {
  DISSATISFIED_SURVEY_ANSWERS,
  INPUT_DATE_REGEX,
  LEAD_ID_REGEX,
  LOCAL_SERVICES_LEAD_CONVERSATION_FIELDS,
  LOCAL_SERVICES_LEAD_FIELDS,
  OTHER_FEEDBACK_REASONS,
  SATISFIED_SURVEY_ANSWERS,
} from "../constants";
import type { LeadFeedbackOptions } from "../types";

const toGAQLDate = (value: string, label: string): string => {
  const match = INPUT_DATE_REGEX.exec(value);
  if (match === null) {
    throw new Error(`${label} must be in MM-DD-YYYY format; got "${value}".`);
  }
  return `${match[3]}-${match[1]}-${match[2]}`;
};

export const leadResourceName = (
  customerId: string,
  leadId: string,
): string => {
  if (!LEAD_ID_REGEX.test(leadId)) {
    throw new Error(`Lead ID must be numeric; got "${leadId}".`);
  }
  return `customers/${customerId}/localServicesLeads/${leadId}`;
};

export const buildLocalServicesLeadsQuery = (
  startDate?: string,
  endDate?: string,
): string => {
  const conditions: string[] = [];
  if (startDate !== undefined) {
    conditions.push(
      `local_services_lead.creation_date_time >= '${toGAQLDate(startDate, "Start Date")} 00:00:00'`,
    );
  }
  if (endDate !== undefined) {
    conditions.push(
      `local_services_lead.creation_date_time <= '${toGAQLDate(endDate, "End Date")} 23:59:59'`,
    );
  }
  const where =
    conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
  return `SELECT ${LOCAL_SERVICES_LEAD_FIELDS.join(", ")} FROM local_services_lead${where} ORDER BY local_services_lead.creation_date_time DESC`;
};

export const buildLeadConversationsQuery = (
  customerId: string,
  leadId?: string,
): string => {
  const where =
    leadId === undefined
      ? ""
      : ` WHERE local_services_lead_conversation.lead = '${leadResourceName(customerId, leadId)}'`;
  return `SELECT ${LOCAL_SERVICES_LEAD_CONVERSATION_FIELDS.join(", ")} FROM local_services_lead_conversation${where} ORDER BY local_services_lead_conversation.event_date_time DESC`;
};

export const buildLeadFeedbackBody = ({
  surveyAnswer,
  satisfiedReason,
  dissatisfiedReason,
  otherReasonComment,
}: LeadFeedbackOptions): Record<string, unknown> => {
  if (satisfiedReason !== undefined && dissatisfiedReason !== undefined) {
    throw new Error(
      "Set either Satisfied Reason or Dissatisfied Reason, not both.",
    );
  }
  if (
    satisfiedReason !== undefined &&
    !SATISFIED_SURVEY_ANSWERS.includes(surveyAnswer)
  ) {
    throw new Error(
      `Satisfied Reason only applies to a Very Satisfied or Satisfied answer; the answer is ${surveyAnswer}.`,
    );
  }
  if (
    dissatisfiedReason !== undefined &&
    !DISSATISFIED_SURVEY_ANSWERS.includes(surveyAnswer)
  ) {
    throw new Error(
      `Dissatisfied Reason only applies to a Dissatisfied or Very Dissatisfied answer; the answer is ${surveyAnswer}.`,
    );
  }

  const reason = satisfiedReason ?? dissatisfiedReason;
  if (
    reason !== undefined &&
    OTHER_FEEDBACK_REASONS.includes(reason) &&
    otherReasonComment === undefined
  ) {
    throw new Error(
      "Other Reason Comment is required when the reason is Other.",
    );
  }

  const comment =
    otherReasonComment === undefined ? {} : { otherReasonComment };

  return {
    surveyAnswer,
    ...(satisfiedReason !== undefined && {
      surveySatisfied: { surveySatisfiedReason: satisfiedReason, ...comment },
    }),
    ...(dissatisfiedReason !== undefined && {
      surveyDissatisfied: {
        surveyDissatisfiedReason: dissatisfiedReason,
        ...comment,
      },
    }),
  };
};
