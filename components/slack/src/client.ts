import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { App } from "@slack/bolt";
import { IncomingWebhook } from "@slack/webhook";
import type { AxiosResponse } from "axios";
import { slackOAuth, webhookUrlConnection } from "./connections";
import { API_URL } from "./constants";
import type {
  AuthTestResponse,
  CreateClientProps,
  EnterpriseContext,
  SlackOAuthToken,
} from "./types";
import { getErrorDescription } from "./util";
export const getApiBaseUrl = ({
  slackConnection,
}: CreateClientProps): string => {
  const tokenUrl = util.types.toString(slackConnection?.fields?.tokenUrl);
  if (!tokenUrl) {
    return API_URL;
  }
  return tokenUrl.replace("oauth.v2.access", "").replace(/\/+$/, "") || API_URL;
};
export const getEnterpriseContext = ({
  slackConnection,
}: CreateClientProps): EnterpriseContext => {
  const token = (slackConnection?.token ?? {}) as SlackOAuthToken;
  return {
    isEnterpriseInstall: token.is_enterprise_install === true,
    enterpriseId: token.enterprise?.id,
    teamId: token.team?.id,
  };
};
export const assertTeamIdForOrgToken = (
  slackConnection: Connection,
  teamId: unknown,
  method: string,
): void => {
  const { isEnterpriseInstall, enterpriseId } = getEnterpriseContext({
    slackConnection,
  });
  if (!isEnterpriseInstall || teamId) {
    return;
  }
  const enterprise = enterpriseId ? ` (enterprise ${enterpriseId})` : "";
  throw new Error(
    `This Slack connection is installed at the organization level${enterprise}, so Slack requires a Team ID on \`${method}\`. Set the Team ID input to the workspace you want to target. The List Teams action returns the available team IDs.`,
  );
};
export const getUserToken = ({ slackConnection }: CreateClientProps) => {
  const user = slackConnection?.token?.authed_user as Record<string, unknown>;
  if (
    util.types.toBool(slackConnection.fields.isUser) &&
    user?.access_token !== undefined
  ) {
    return util.types.toString(user.access_token);
  }
  return util.types.toString(slackConnection?.token?.access_token);
};
export const accountIsActiveFn = async (
  token: string,
  slackConnection: Connection,
): Promise<boolean | Error> => {
  const client = createClient({ baseUrl: getApiBaseUrl({ slackConnection }) });
  const response: AxiosResponse<AuthTestResponse> = await client.get(
    "/auth.test",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const data: AuthTestResponse = response.data;
  if (data.ok) {
    return true;
  }
  throw new Error(`${data.error}: ${getErrorDescription(data.error)}`);
};
export const createOauthClient = async ({
  slackConnection,
}: CreateClientProps) => {
  if (slackConnection.key !== slackOAuth.key) {
    throw new ConnectionError(
      slackConnection,
      `Unsupported authorization method ${slackConnection.key}.`,
    );
  }
  const token = getUserToken({ slackConnection });
  const accountIsActive = await accountIsActiveFn(token, slackConnection);
  if (accountIsActive) {
    const app = new App({
      token,
      clientOptions: {
        slackApiUrl: `${getApiBaseUrl({ slackConnection })}/`,
      },
      signingSecret: util.types.toString(slackConnection.fields.signingSecret),
      scopes: util.types.toString(slackConnection.fields.scopes),
      clientId: util.types.toString(slackConnection.fields.clientId),
      clientSecret: util.types.toString(slackConnection.fields.clientSecret),
    });
    return app.client;
  }
};
export const createWebhookClient = (
  connection: Connection,
): IncomingWebhook => {
  const webhookRegex = /^https:\/\/hooks.slack.com\/services\/T\w*\/B\w*\/\w*$/;
  const { key, fields } = connection;
  if (key !== webhookUrlConnection.key) {
    throw new ConnectionError(
      connection,
      "The connection provided to this step is not a webhook connection. Please ensure that the connection contains a webhook URL (and is not a Slack OAuth connection).",
    );
  }
  const { webhookUrl } = fields;
  if (!webhookRegex.exec(util.types.toString(webhookUrl))) {
    throw new ConnectionError(
      connection,
      `The Slack Webhook URL you provided, "${webhookUrl}", does not follow the format "https://hooks.slack.com/services/TXXXX/BXXXXX/XXXXXXX".`,
    );
  }
  return new IncomingWebhook(util.types.toString(webhookUrl));
};
