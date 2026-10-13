import type {
  SurveyResponseChange,
  SurveyResponseChangesObject,
} from "../types";
export const getBase64FromUrl = (url: string): string => {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
};
export const generateWebhookName = (
  flowName: string,
  stateKey: string,
): string => {
  const maxFlowNameLength = 30;
  const truncatedFlowName = flowName.slice(0, maxFlowNameLength);
  const uniqueSuffix = stateKey.slice(-8);
  return `${truncatedFlowName}-${uniqueSuffix}`;
};
export const resolveSurveyResponseChanges = (
  data: SurveyResponseChangesObject | undefined,
): SurveyResponseChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): SurveyResponseChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): SurveyResponseChange => ({ changeType: "updated", record }),
    ),
  ];
};
