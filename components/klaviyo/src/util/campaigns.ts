import type {
  CampaignCreateQueryResourceObjectAttributesSendStrategy as SendStrategy,
  CampaignMessageCreateQueryResourceObject as CampaignMessage,
  CampaignResponseObjectResourceAttributesTrackingOptions as TrackingOptions,
} from "klaviyo-api";
import type { FieldsCampaign, UnknownRecord } from "../types";

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const withoutNullish = (record: UnknownRecord): UnknownRecord =>
  Object.fromEntries(
    Object.entries(record).filter(([, value]) => value != null),
  );

const LEGACY_CAMPAIGN_FIELDS: Record<string, FieldsCampaign[]> = {
  "send_strategy.options_static": [
    "send_strategy.datetime",
    "send_strategy.options",
  ],
  "send_strategy.options_static.datetime": ["send_strategy.datetime"],
  "send_strategy.options_static.is_local": ["send_strategy.options.is_local"],
  "send_strategy.options_static.send_past_recipients_immediately": [
    "send_strategy.options.send_past_recipients_immediately",
  ],
  "send_strategy.options_throttled": [
    "send_strategy.datetime",
    "send_strategy.throttle_percentage",
  ],
  "send_strategy.options_throttled.datetime": ["send_strategy.datetime"],
  "send_strategy.options_throttled.throttle_percentage": [
    "send_strategy.throttle_percentage",
  ],
  "send_strategy.options_sto": ["send_strategy.date"],
  "send_strategy.options_sto.date": ["send_strategy.date"],
};

const LEGACY_MESSAGE_KEYS_DROPPED: Record<string, string[]> = {
  email: ["renderOptions"],
  sms: ["label"],
};

export const toCampaignFields = (
  fields: string[] | undefined,
): FieldsCampaign[] | undefined => {
  if (!fields) {
    return undefined;
  }
  const mapped = fields.flatMap(
    (field) => LEGACY_CAMPAIGN_FIELDS[field] ?? [field as FieldsCampaign],
  );
  if (
    mapped.some((field) => field.startsWith("send_strategy.")) &&
    !mapped.includes("send_strategy")
  ) {
    mapped.push("send_strategy.method");
  }
  return Array.from(new Set(mapped));
};

export const toSendStrategy = (value: unknown): SendStrategy | undefined => {
  if (!isRecord(value)) {
    return undefined;
  }
  const { optionsStatic, optionsThrottled, optionsSto, ...strategy } = value;
  if (
    optionsStatic === undefined &&
    optionsThrottled === undefined &&
    optionsSto === undefined
  ) {
    return value as unknown as SendStrategy;
  }
  const legacyOptions: Record<string, unknown> = {
    static: optionsStatic,
    throttled: optionsThrottled,
    smart_send_time: optionsSto,
  };
  const selected = legacyOptions[String(strategy.method)];
  if (!isRecord(selected)) {
    return strategy as unknown as SendStrategy;
  }
  if (strategy.method === "static") {
    const { datetime, ...rest } = selected;
    const options = withoutNullish(rest);
    if (options.isLocal !== true) {
      delete options.sendPastRecipientsImmediately;
    }
    return {
      ...strategy,
      datetime,
      ...(Object.keys(options).length > 0 ? { options } : {}),
    } as unknown as SendStrategy;
  }
  return {
    ...strategy,
    ...withoutNullish(selected),
  } as unknown as SendStrategy;
};

export const toTrackingOptions = (
  value: unknown,
): TrackingOptions | undefined => {
  if (!isRecord(value)) {
    return undefined;
  }
  const { isAddUtm, utmParams, ...options } = value;
  if (isAddUtm === undefined && utmParams === undefined) {
    return value as unknown as TrackingOptions;
  }
  return {
    ...options,
    ...(isAddUtm !== undefined ? { addTrackingParams: isAddUtm } : {}),
    ...(Array.isArray(utmParams)
      ? {
          customTrackingParams: utmParams.map((param) => ({
            type: "static",
            ...(isRecord(param) ? param : {}),
          })),
        }
      : {}),
  } as unknown as TrackingOptions;
};

export const toCampaignMessages = (
  value: unknown[] | undefined,
): CampaignMessage[] | undefined => {
  if (!value) {
    return undefined;
  }
  return value.map((message) => {
    if (
      !isRecord(message) ||
      !isRecord(message.attributes) ||
      message.attributes.definition !== undefined
    ) {
      return message as unknown as CampaignMessage;
    }
    const { attributes, ...rest } = message;
    const dropped =
      LEGACY_MESSAGE_KEYS_DROPPED[String(attributes.channel)] ?? [];
    const definition = Object.fromEntries(
      Object.entries(attributes).filter(([key]) => !dropped.includes(key)),
    );
    return {
      ...rest,
      attributes: { definition },
    } as unknown as CampaignMessage;
  });
};
