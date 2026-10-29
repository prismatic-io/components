import type { Message } from "@aws-sdk/client-sqs";
import type { ActionContext } from "@prismatic-io/spectral";
import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { convertTrigger } from "@prismatic-io/spectral/dist/serverTypes/convertComponent";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { PollMessagesPollingState } from "../interfaces/PollMessagesPollingState";
import { receiveMessagesExample } from "../examplePayloads";
import type { PollMessageChange, PollMessagesChanges } from "../types";
import { pollMessagesTrigger } from "./pollMessagesTrigger";

const NOW = Date.parse("2026-06-10T00:00:00.000Z");
const LAST_POLL = Date.parse("2026-06-01T00:00:00.000Z");
const LOOK_BACK = "2026-05-01T00:00:00.000Z";

const params = {
  url: "https://sqs.us-east-1.amazonaws.com/012345678900/my-example-queue",
  awsRegion: "us-east-1",
  lookBackDate: "",
};

const messageSentAt = (id: string, sentAt: number): Message => ({
  MessageId: id,
  ReceiptHandle: `handle-${id}`,
  Body: `body-${id}`,
  Attributes: { SentTimestamp: String(sentAt) },
});

const newMessage = messageSentAt("new", Date.parse("2026-06-05T00:00:00.000Z"));
const onLookBackMessage = messageSentAt("on-look-back", Date.parse(LOOK_BACK));
const staleMessage = messageSentAt(
  "stale",
  Date.parse("2026-04-01T00:00:00.000Z"),
);

type PollResult = {
  payload: { body: { data: PollMessagesChanges } };
  polledNoChanges: boolean;
};

const createPollingContext = (
  batches: Message[][],
  initialState: PollMessagesPollingState = {},
) => {
  let store = initialState;
  const pending = [...batches];
  const invokeAction = vi.fn(async () => ({
    data: { Messages: pending.shift() ?? [] },
  }));
  const context = {
    polling: {
      getState: () => store,
      setState: (state: PollMessagesPollingState) => {
        store = state;
      },
      invokeAction,
    },
    debug: { enabled: false },
  } as unknown as Partial<ActionContext>;
  return { context, invokeAction, getStore: () => store };
};

const poll = async (
  context: Partial<ActionContext>,
  overrides: Partial<typeof params> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    pollMessagesTrigger as never,
    context,
    undefined,
    { ...params, ...overrides } as never,
  );
  return result as unknown as PollResult;
};

const ids = (messages: Message[]) =>
  messages.map((message) => message.MessageId);

describe("pollMessagesTrigger", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("New Messages is opt-in batchable with a default batch size", () => {
    expect(pollMessagesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollMessagesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollMessagesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });

  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: [newMessage, staleMessage] },
    };
    expect(
      pollMessagesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload,
        } as never,
      ),
    ).toEqual([
      { changeType: "created", record: newMessage },
      { changeType: "created", record: staleMessage },
    ]);
  });

  test("renders the Look-back Date ahead of the receive action's inputs", () => {
    const rendered = convertTrigger("pollMessagesTrigger", pollMessagesTrigger);
    expect(rendered.inputs.map((input) => input.key)).toEqual([
      "lookBackDate",
      "url",
      "awsConnection",
      "awsRegion",
      "dynamicAccessKeyId",
      "dynamicSecretAccessKey",
      "dynamicSessionToken",
    ]);
  });

  test("resolveItems splits an example payload into batchSize-sized executions", () => {
    const exampleMessage = receiveMessagesExample.data.Messages[0];
    const messages: Message[] = Array.from({ length: 120 }, (_, index) => ({
      ...exampleMessage,
      MessageId: `message-${index}`,
    }));
    const payload = { ...defaultTriggerPayload(), body: { data: messages } };
    const items = pollMessagesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload } as never,
    ) as PollMessageChange[];
    expect(items).toHaveLength(120);
    expect(items[0]).toEqual({
      changeType: "created",
      record: { ...exampleMessage, MessageId: "message-0" },
    });

    const chunk = <T>(list: T[], size: number): T[][] =>
      Array.from({ length: Math.ceil(list.length / size) }, (_, index) =>
        list.slice(index * size, (index + 1) * size),
      );
    const batches = chunk(items, pollMessagesTrigger.batchConfig.batchSize);
    expect(batches.map((batch) => batch.length)).toEqual([50, 50, 20]);
  });

  test("resolveItems returns [] when the payload carries no data", () => {
    const payload = { ...defaultTriggerPayload(), body: { data: undefined } };
    expect(
      pollMessagesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload,
        } as never,
      ),
    ).toEqual([]);
  });

  test("a first poll without a Look-back Date emits nothing sent before now", async () => {
    const { context, getStore } = createPollingContext([
      [newMessage, onLookBackMessage, staleMessage],
    ]);
    const result = await poll(context);
    expect(result.payload.body.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: NOW });
  });

  test("a first poll with a Look-back Date seeds messages sent on or after it", async () => {
    const { context, invokeAction, getStore } = createPollingContext([
      [newMessage, onLookBackMessage],
      [staleMessage],
    ]);
    const result = await poll(context, { lookBackDate: LOOK_BACK });
    expect(ids(result.payload.body.data)).toEqual(["new", "on-look-back"]);
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: NOW });
    expect(invokeAction).toHaveBeenCalledWith({
      url: params.url,
      awsRegion: params.awsRegion,
    });
  });

  test("a later poll ignores the Look-back Date and filters from the persisted cursor", async () => {
    const { context } = createPollingContext(
      [[newMessage, onLookBackMessage, staleMessage]],
      { lastPolledAt: LAST_POLL },
    );
    const result = await poll(context, { lookBackDate: LOOK_BACK });
    expect(ids(result.payload.body.data)).toEqual(["new"]);
  });
});
