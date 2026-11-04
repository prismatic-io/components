import type { ActionContext } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import { IO_EVENTS_REGISTRATION_NAME_MAX_LENGTH } from "../constants";
import type {
  AemWebhookFlowState,
  IoEventsRegistration,
  IoEventsRegistrationListResponse,
  RegistrationParams,
} from "../types";

const workspacePath = ({
  consumerOrgId,
  projectId,
  workspaceId,
}: RegistrationParams): string =>
  `/${encodeURIComponent(consumerOrgId)}/${encodeURIComponent(projectId)}/${encodeURIComponent(workspaceId)}`;

export const webhookStateKey = (context: ActionContext): string =>
  `aemEventSubscription:${context.flow.id}`;

export const getWebhookUrl = (context: ActionContext): string =>
  context.webhookUrls[context.flow.name];

const sameConfig = (
  state: AemWebhookFlowState,
  params: RegistrationParams,
): boolean =>
  state.previousWorkspace === workspacePath(params) &&
  state.previousProviderId === params.providerId &&
  state.previousClientId ===
    util.types.toString(params.connection.fields.clientId) &&
  [...state.previousEventTypes].sort().join(",") ===
    [...params.eventTypes].sort().join(",");

export const deleteRegistrationsForUrl = async (
  client: HttpClient,
  params: RegistrationParams,
  webhookUrl: string,
): Promise<number> => {
  const base = `${workspacePath(params)}/registrations`;
  const { data } = await client.get<IoEventsRegistrationListResponse>(base);
  const matches = (data._embedded?.registrations ?? []).filter(
    (registration) => registration.webhook_url === webhookUrl,
  );
  for (const registration of matches) {
    await client.delete(
      `${base}/${encodeURIComponent(registration.registration_id)}`,
    );
  }
  return matches.length;
};

export const ensureRegistration = async (
  context: ActionContext,
  client: HttpClient,
  params: RegistrationParams,
): Promise<AemWebhookFlowState | undefined> => {
  const webhookUrl = getWebhookUrl(context);
  const existing = context.crossFlowState[webhookStateKey(context)] as
    | AemWebhookFlowState
    | undefined;

  if (existing?.registrationId && sameConfig(existing, params)) {
    context.logger.info(
      "AEM event registration already exists with the same settings; skipping.",
    );
    return undefined;
  }

  const oldParams = existing
    ? (() => {
        const [, org, project, workspace] =
          existing.previousWorkspace.split("/");
        return {
          ...params,
          consumerOrgId: decodeURIComponent(org),
          projectId: decodeURIComponent(project),
          workspaceId: decodeURIComponent(workspace),
        };
      })()
    : params;
  let removed = await deleteRegistrationsForUrl(client, oldParams, webhookUrl);
  if (workspacePath(oldParams) !== workspacePath(params)) {
    removed += await deleteRegistrationsForUrl(client, params, webhookUrl);
  }
  context.logger.info(
    existing
      ? `Settings changed; removed ${removed} AEM event registration(s) and recreating.`
      : `Creating AEM event registration (removed ${removed} stale registration(s) for this URL).`,
  );

  const { data } = await client.post<IoEventsRegistration>(
    `${workspacePath(params)}/registrations`,
    {
      client_id: util.types.toString(params.connection.fields.clientId),
      name: `AEM events: ${context.flow.name}`.slice(
        0,
        IO_EVENTS_REGISTRATION_NAME_MAX_LENGTH,
      ),
      description: "Adobe Experience Manager events for an integration flow.",
      delivery_type: "webhook",
      webhook_url: webhookUrl,
      events_of_interest: params.eventTypes.map((eventCode) => ({
        provider_id: params.providerId,
        event_code: eventCode,
      })),
      enabled: true,
    },
  );
  return {
    registrationId: data.registration_id,
    previousClientId: util.types.toString(params.connection.fields.clientId),
    previousEventTypes: params.eventTypes,
    previousProviderId: params.providerId,
    previousWorkspace: workspacePath(params),
  };
};
