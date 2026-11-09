import type { LeadFeedbackOptions } from "../types";
import {
  buildLeadConversationsQuery,
  buildLeadFeedbackBody,
  buildLocalServicesLeadsQuery,
  leadResourceName,
} from "./localServices";

describe("buildLocalServicesLeadsQuery", () => {
  test("selects every lead field, newest first, with no filter by default", () => {
    const query = buildLocalServicesLeadsQuery();
    expect(query).toMatch(/^SELECT local_services_lead\.resource_name, /);
    expect(query).toContain("local_services_lead.contact_details");
    expect(query).toContain(
      "FROM local_services_lead ORDER BY local_services_lead.creation_date_time DESC",
    );
    expect(query).not.toContain("WHERE");
  });

  test("turns MM-DD-YYYY dates into an inclusive creation-time range", () => {
    expect(buildLocalServicesLeadsQuery("10-01-2026", "10-31-2026")).toContain(
      "WHERE local_services_lead.creation_date_time >= '2026-10-01 00:00:00' AND local_services_lead.creation_date_time <= '2026-10-31 23:59:59'",
    );
  });

  test("refuses a date in any other format", () => {
    expect(() => buildLocalServicesLeadsQuery("2026-10-01")).toThrow(
      'Start Date must be in MM-DD-YYYY format; got "2026-10-01".',
    );
    expect(() =>
      buildLocalServicesLeadsQuery(undefined, "10-31-2026' OR 1=1"),
    ).toThrow("End Date must be in MM-DD-YYYY format");
  });
});

describe("buildLeadConversationsQuery", () => {
  test("lists every conversation when no lead is given", () => {
    const query = buildLeadConversationsQuery("1234567890");
    expect(query).toContain("FROM local_services_lead_conversation ORDER BY");
    expect(query).not.toContain("WHERE");
  });

  test("filters on one lead's resource name", () => {
    expect(buildLeadConversationsQuery("1234567890", "5566778899")).toContain(
      "WHERE local_services_lead_conversation.lead = 'customers/1234567890/localServicesLeads/5566778899'",
    );
  });
});

describe("leadResourceName", () => {
  test("refuses a non-numeric lead ID", () => {
    expect(() => leadResourceName("1234567890", "55/../66")).toThrow(
      'Lead ID must be numeric; got "55/../66".',
    );
  });
});

describe("buildLeadFeedbackBody", () => {
  test("a satisfied answer carries its reason in surveySatisfied", () => {
    expect(
      buildLeadFeedbackBody({
        surveyAnswer: "SATISFIED",
        satisfiedReason: "BOOKED_CUSTOMER",
      }),
    ).toEqual({
      surveyAnswer: "SATISFIED",
      surveySatisfied: { surveySatisfiedReason: "BOOKED_CUSTOMER" },
    });
  });

  test("an Other reason carries the comment", () => {
    expect(
      buildLeadFeedbackBody({
        surveyAnswer: "VERY_DISSATISFIED",
        dissatisfiedReason: "OTHER_DISSATISFIED_REASON",
        otherReasonComment: "Wrong city.",
      }),
    ).toEqual({
      surveyAnswer: "VERY_DISSATISFIED",
      surveyDissatisfied: {
        surveyDissatisfiedReason: "OTHER_DISSATISFIED_REASON",
        otherReasonComment: "Wrong city.",
      },
    });
  });

  test("a neutral answer sends the answer alone", () => {
    expect(buildLeadFeedbackBody({ surveyAnswer: "NEUTRAL" })).toEqual({
      surveyAnswer: "NEUTRAL",
    });
  });

  test.each<[string, LeadFeedbackOptions, string]>([
    [
      "both reasons",
      {
        surveyAnswer: "SATISFIED",
        satisfiedReason: "BOOKED_CUSTOMER",
        dissatisfiedReason: "SPAM",
      },
      "not both",
    ],
    [
      "a satisfied reason on a dissatisfied answer",
      { surveyAnswer: "DISSATISFIED", satisfiedReason: "BOOKED_CUSTOMER" },
      "Satisfied Reason only applies",
    ],
    [
      "a dissatisfied reason on a neutral answer",
      { surveyAnswer: "NEUTRAL", dissatisfiedReason: "SPAM" },
      "Dissatisfied Reason only applies",
    ],
    [
      "an Other reason without a comment",
      { surveyAnswer: "SATISFIED", satisfiedReason: "OTHER_SATISFIED_REASON" },
      "Other Reason Comment is required",
    ],
  ])("refuses %s", (_, options, message) => {
    expect(() => buildLeadFeedbackBody(options)).toThrow(message);
  });
});
