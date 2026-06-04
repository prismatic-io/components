import type { WebhookSubscriptionPayload, Webhook } from "../types";
import { WEBHOOK_SUBSCRIPTIONS_URL } from "../constants";
import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const getEventTypes = async (
  client: HttpClient,
  adminManaged: boolean,
  organization: string | undefined,
  user: string | undefined,
  userAvailabilitySchedule: string | undefined,
  active: boolean,
  sort: string | undefined,
) => {
  const data = await paginator(client, "/event_types", {
    admin_managed: adminManaged,
    organization: organization || undefined,
    user: user || undefined,
    user_availability_schedule: userAvailabilitySchedule || undefined,
    active,
    sort: sort || undefined,
  });
  return data;
};

export const getOrganizationMemberships = async (
  client: HttpClient,
  email: string | undefined,
  organization: string | undefined,
  user: string | undefined,
) => {
  const data = await paginator(client, "/organization_memberships", {
    email: email || undefined,
    organization: organization || undefined,
    user: user || undefined,
  });
  return data;
};

export const getUuidFromUri = (url: string): string =>
  url.replace(WEBHOOK_SUBSCRIPTIONS_URL, "");

export const postWebhookSubscription = async (
  client: HttpClient,
  url: string,
  events: string[],
  organization: string,
  user: string | undefined,
  scope: string,
  signingKey: string | undefined,
) => {
  const body = {
    url,
    events,
    organization,
    user: user || undefined,
    scope,
    signing_key: signingKey || undefined,
  };
  
  const { data } = await client.post("/webhook_subscriptions", body);
  return data;
};

export const findWebhook = async (
  client: HttpClient,
  url: string,
  organization: string,
  user: string | undefined,
  scope: string,
): Promise<Webhook | undefined> => {
  let nextPageToken: string | undefined;
  let foundWebhook: Webhook | undefined;

  
  do {
    const data: WebhookSubscriptionPayload = await getWebhookSubscriptions(
      client,
      organization,
      scope,
      "20",
      nextPageToken,
      undefined,
      user,
    );
    foundWebhook = data.collection.find(
      (webhook) => webhook.callback_url === url,
    );

    if (!foundWebhook) {
      
      nextPageToken = data.pagination.next_page_token ?? undefined;
    }
  } while (!foundWebhook && nextPageToken);

  return foundWebhook;
};

export const getWebhookSubscriptions = async (
  client: HttpClient,
  organization: string,
  scope: string,
  count: string,
  pageToken: string | undefined,
  sort: string | undefined,
  user: string | undefined,
): Promise<WebhookSubscriptionPayload> => {
  const { data } = await client.get("/webhook_subscriptions", {
    params: {
      organization,
      scope,
      count: count || undefined,
      page_token: pageToken || undefined,
      sort: sort || undefined,
      user: user || undefined,
    },
  });
  return data;
};

export const deleteWebhook = async (
  client: HttpClient,
  webhookUuid: string,
) => {
  const { data } = await client.delete(`/webhook_subscriptions/${webhookUuid}`);
  return data;
};

export const deleteWebhookInstance = async (
  client: HttpClient,
  endpoint: string,
  organization: string,
  user: string | undefined,
  scope: string,
) => {
  const foundWebhook = await findWebhook(
    client,
    endpoint,
    organization,
    user,
    scope,
  );

  if (foundWebhook)
    return await deleteWebhook(client, getUuidFromUri(foundWebhook.uri));

  throw new Error("Webhook not found");
};

export const paginator = async (
  client: HttpClient,
  url: string,
  params: Record<string, unknown>,
) => {
  const allData = [];
  do {
    const { data } = await client.get(url, { params });
    
    if (data.pagination.next_page_token) {
      params.page_token = data.pagination.next_page_token;
    } else {
      
      params.page_token = undefined;
    }
    
    if (data.collection) {
      allData.push(...data.collection);
    }
  } while (params.page_token);
  return allData;
};

export const getEvents = async (
  client: HttpClient,
  inviteeEmail: string | undefined,
  maxStartTime: string | undefined,
  minStartTime: string | undefined,
  organization: string | undefined,
  sort: string | undefined,
  status: string | undefined,
  user: string | undefined,
) => {
  const allData = await paginator(client, "/scheduled_events", {
    invitee_email: inviteeEmail || undefined,
    max_start_time: maxStartTime || undefined,
    min_start_time: minStartTime || undefined,
    organization: organization || undefined,
    sort: sort || undefined,
    status: status || undefined,
    user: user || undefined,
  });

  return allData;
};

export const getRoutingForms = async (
  client: HttpClient,
  organization: string,
  sort: string | undefined,
) => {
  const data = await paginator(client, "/routing_forms", {
    organization,
    sort: sort || undefined,
  });

  return data;
};

export const cleanOrganizationInput = (value: unknown) => {
  const organizationsBasePath = "https://api.calendly.com/organizations/";
  if (typeof value === "string") {
    
    if (!value.includes(organizationsBasePath)) {
      
      return `${organizationsBasePath}${value}`;
    }
  }
  
  return util.types.toString(value);
};

export const extractUuidFromUri = (uri: string): string => {
  
  const parts = uri.split("/");
  return parts[parts.length - 1];
};
