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
