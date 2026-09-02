import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { cannyApiKey } from "./connections/apiKey";
import { pollChangesTrigger } from "./triggers/pollChangesTrigger";
import type { PollingState, Post } from "./types";
export const TEST_API_KEY = "test-api-key";
export const CANNY_HOST = "https://canny.io";
export const V1 = "/api/v1";
export const V2 = "/api/v2";
export const ROOT = "/api";
export const testConnection = createConnection(cannyApiKey, {
  apiKey: TEST_API_KEY,
});
export const captureBody = () => {
  const captured: {
    body: Record<string, unknown>;
  } = { body: {} };
  return {
    captured,
    // biome-ignore lint/suspicious/noExplicitAny: nock types its body matcher as any.
    matcher: (body: any) => {
      captured.body = body as Record<string, unknown>;
      return true;
    },
  };
};
export const buildPost = (
  id: string,
  created: string,
  statusChangedAt = "",
): Post =>
  ({
    id,
    created,
    statusChangedAt,
    title: `Post ${id}`,
  }) as unknown as Post;
export const createPollingContext = (initialState: PollingState = {}) => {
  const store: {
    state: PollingState;
  } = { state: initialState };
  return {
    store,
    context: {
      polling: {
        getState: () => store.state,
        setState: (state: PollingState) => {
          store.state = state;
        },
        invokeAction: async () => ({}),
      },
    },
  };
};
export type PollResult = Awaited<ReturnType<typeof pollChangesTrigger.perform>>;
export const invokePollChangesTrigger = async (
  context: Record<string, unknown>,
  params: Record<string, unknown>,
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    pollChangesTrigger as unknown as Parameters<typeof invokeTrigger>[0],
    context as never,
    defaultTriggerPayload(),
    params as never,
  );
  return result as unknown as PollResult;
};
