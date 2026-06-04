import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { REFRESH_THRESHOLD_DAYS } from "../constants";
import type {
  AtlassianWebhook,
  AtlassianWebhookBasicConfig,
  AtlassianWebhookConfig,
  CreateAtlassianWebhookBasicRequest,
  CreateAtlassianWebhookBasicResponse,
  CreateAtlassianWebhookRequest,
  CreateAtlassianWebhookResponse,
  DeleteAtlassianWebhookRequest,
  PaginatedResponse,
  RefreshAtlassianWebhookRequest,
  RefreshAtlassianWebhookResponse,
  WebhookDeletion,
} from "../interfaces/Webhooks";

export const createAtlassianWebhook = async (
  client: HttpClient,
  url: string,
  webhooks: AtlassianWebhookConfig[],
): Promise<CreateAtlassianWebhookResponse> => {
  const requestBody: CreateAtlassianWebhookRequest = {
    url,
    webhooks,
  };

  const { data } = await client.post<CreateAtlassianWebhookResponse>(
    "/webhook",
    requestBody,
  );

  return data;
};

export const createAtlassianWebhookBasic = async (
  client: HttpClient,
  url: string,
  webhookConfig: AtlassianWebhookBasicConfig,
): Promise<CreateAtlassianWebhookBasicResponse> => {
  const requestBody: CreateAtlassianWebhookBasicRequest = {
    url,
    ...webhookConfig,
  };

  const { data } = await client.post<CreateAtlassianWebhookBasicResponse>(
    "/webhook",
    requestBody,
  );

  return data;
};

export const deleteAtlassianWebhook = async (
  client: HttpClient,
  webhookIds: number[],
): Promise<void> => {
  const requestBody: DeleteAtlassianWebhookRequest = {
    webhookIds,
  };

  await client.delete("/webhook", {
    data: requestBody,
  });
};

export const deleteAtlassianWebhookBasic = async (
  client: HttpClient,
  webhookId: number,
): Promise<void> => {
  await client.delete(`/webhook/${webhookId}`);
};

export const refreshAtlassianWebhook = async (
  client: HttpClient,
  webhookIds: number[],
): Promise<RefreshAtlassianWebhookResponse> => {
  const requestBody: RefreshAtlassianWebhookRequest = {
    webhookIds,
  };

  const { data } = await client.put<RefreshAtlassianWebhookResponse>(
    "/webhook/refresh",
    requestBody,
  );

  return data;
};

export const listAtlassianWebhooks = async (
  client: HttpClient,
  fetchAll = false,
): Promise<AtlassianWebhook[]> => {
  const { data } =
    await client.get<PaginatedResponse<AtlassianWebhook>>("/webhook");

  if (!fetchAll || data.isLast) {
    return data.values || [];
  }

  const allWebhooks = [...data.values];
  let startAt = data.startAt + data.maxResults;

  while (startAt < data.total) {
    const { data: nextPage } = await client.get<
      PaginatedResponse<AtlassianWebhook>
    >("/webhook", {
      params: { startAt, maxResults: data.maxResults },
    });

    allWebhooks.push(...nextPage.values);

    if (nextPage.isLast) break;
    startAt += nextPage.maxResults;
  }

  return allWebhooks;
};

export const getAtlassianWebhookById = async (
  client: HttpClient,
  webhookId: number,
): Promise<AtlassianWebhook | undefined> => {
  const webhooks = await listAtlassianWebhooks(client, true);
  return webhooks.find((webhook) => webhook.id === webhookId);
};

export const deleteAtlassianWebhookById = async (
  client: HttpClient,
  webhookId: number,
): Promise<WebhookDeletion> => {
  try {
    await deleteAtlassianWebhook(client, [webhookId]);
    return { id: webhookId, deleted: true };
  } catch (error) {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status === 404) {
      return { id: webhookId, deleted: true };
    }
    throw error;
  }
};

export const deleteAtlassianWebhookByIdBasic = async (
  client: HttpClient,
  webhookId: number,
): Promise<WebhookDeletion> => {
  try {
    await deleteAtlassianWebhookBasic(client, webhookId);
    return { id: webhookId, deleted: true };
  } catch (error) {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status === 404) {
      return { id: webhookId, deleted: true };
    }
    throw error;
  }
};

export const needsRefresh = (
  expirationDate: string,
  thresholdDays: number = REFRESH_THRESHOLD_DAYS,
): boolean => {
  const expiration = new Date(expirationDate).getTime();
  const now = Date.now();
  const thresholdMs = thresholdDays * 24 * 60 * 60 * 1000;

  return expiration - now < thresholdMs;
};

export const daysUntilExpiration = (expirationDate: string): number => {
  const expiration = new Date(expirationDate).getTime();
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;

  return Math.floor((expiration - now) / msPerDay);
};

export const isExpired = (expirationDate: string): boolean => {
  const expiration = new Date(expirationDate).getTime();
  return Date.now() > expiration;
};
