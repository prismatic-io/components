import type { ActionContext, TriggerPayload } from "@prismatic-io/spectral";

export const perform = async (
  context: ActionContext,
  payload: TriggerPayload,
) => {
  return Promise.resolve({
    payload,
    statusCode: 200,
    contentType: "application/json",
  });
};
