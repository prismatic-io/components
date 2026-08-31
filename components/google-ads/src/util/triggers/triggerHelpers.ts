import type { TriggerPayload } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { createClient } from "../../client";
import type {
  BasePollingState,
  TriggerClientContext,
  TriggerClientParams,
} from "../../types";
import { getCustomerTimezone } from "./dateUtils";
export const createTriggerClient = async (
  context: TriggerClientContext,
  params: TriggerClientParams,
): Promise<{
  client: HttpClient;
  timezone: string;
}> => {
  const client = createClient({
    connection: params.connection,
    debugEnabled: context.debug.enabled,
    logger: context.logger,
    loginCustomerId: params.managerCustomerId,
  });
  const timezone = await getCustomerTimezone(client, params.customerId);
  return { client, timezone };
};
export const getPollingState = <T extends BasePollingState>(
  context: {
    polling: {
      getState: () => unknown;
    };
  },
  initialState: T,
): T => {
  const state = context.polling.getState();
  return state && Object.keys(state).length > 0 ? (state as T) : initialState;
};
export const buildTriggerPayload = <TPayload extends TriggerPayload>(
  payload: TPayload,
  data: unknown,
): TPayload => ({
  ...payload,
  body: { data },
});
