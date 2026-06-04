export {
  buildAuthHeaders,
  type CreateAtlassianClientOptions,
  createAtlassianClient,
  isAtlassianBasicAuth,
  resolveAtlassianHost,
  validateAtlassianConnection,
} from "./auth";

export {
  getAtlassianBasicAuthConnection,
  getAtlassianOAuth2AuthorizationCodeConnection,
  getAtlassianOAuth2ClientCredentialsConnection,
} from "./connections";

export {
  DEFAULT_WEBHOOK_EXPIRATION_DAYS,
  REFRESH_THRESHOLD_DAYS,
} from "./constants";
export type { AccessibleResource } from "./interfaces/AccessibleResource";
export type { AtlassianConnectionKeys } from "./interfaces/AtlassianConnectionKeys";
export type {
  BasicAuthConnectionParams,
  ConnectionDisplayOverrides,
  OAuth2AuthorizationCodeConnectionParams,
  OAuth2ClientCredentialsConnectionParams,
} from "./interfaces/ConnectionParams";
export type {
  AtlassianWebhook,
  AtlassianWebhookConfig,
  AtlassianWebhookListResponse,
  AtlassianWebhookState,
  CreateAtlassianWebhookBasicRequest,
  CreateAtlassianWebhookBasicResponse,
  CreateAtlassianWebhookRequest,
  CreateAtlassianWebhookResponse,
  CreateWebhookTriggerParams,
  DeleteAtlassianWebhookRequest,
  PaginatedResponse,
  RefreshAtlassianWebhookRequest,
  RefreshAtlassianWebhookResponse,
  WebhookDeletion,
  WebhookRegistrationResult,
} from "./interfaces/Webhooks";

export {
  checkAndRefreshWebhook,
  createWebhookTrigger,
  createWebhookTriggerBasic,
  deleteWebhookTrigger,
  deleteWebhookTriggerBasic,
} from "./webhooks/triggerFunctions";

export {
  createAtlassianWebhook,
  createAtlassianWebhookBasic,
  daysUntilExpiration,
  deleteAtlassianWebhook,
  deleteAtlassianWebhookBasic,
  deleteAtlassianWebhookById,
  deleteAtlassianWebhookByIdBasic,
  getAtlassianWebhookById,
  isExpired,
  listAtlassianWebhooks,
  needsRefresh,
  refreshAtlassianWebhook,
} from "./webhooks/utils";
