export type SurveyAnswer =
  | "VERY_SATISFIED"
  | "SATISFIED"
  | "NEUTRAL"
  | "DISSATISFIED"
  | "VERY_DISSATISFIED";

export interface LeadFeedbackOptions {
  surveyAnswer: SurveyAnswer;
  satisfiedReason?: string;
  dissatisfiedReason?: string;
  otherReasonComment?: string;
}
