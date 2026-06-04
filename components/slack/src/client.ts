import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { App } from "@slack/bolt";
import { IncomingWebhook } from "@slack/webhook";
import type { AxiosResponse } from "axios";
import { slackOAuth, webhookUrlConnection } from "./connections";
import { API_URL } from "./constants";
import type { AuthTestResponse, CreateClientProps } from "./types";
import { getErrorDescription } from "./util";

export const getUserToken = ({ slackConnection }: CreateClientProps) => {
  const user = slackConnection?.token.authed_user as Record<string, unknown>;
  if (
    util.types.toBool(slackConnection.fields.isUser) &&
    user.access_token !== undefined
  ) {
    return util.types.toString(user.access_token);
  }
  return util.types.toString(slackConnection.token.access_token);
};

export const accountIsActiveFn = async (
  token: string
): Promise<boolean | Error> => {
  const client = createClient({ baseUrl: API_URL });
  const response: AxiosResponse<AuthTestResponse> = await client.get(
    "/auth.test",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
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
      `Unsupported authorization method ${slackConnection.key}.`
    );
  }
  const token = getUserToken({ slackConnection });
  const accountIsActive = await accountIsActiveFn(token);
  if (accountIsActive) {
    const app = new App({
      token,
      clientOptions: {
        
        slackApiUrl: util.types
          .toString(slackConnection.fields.tokenUrl)
          .replace("oauth.v2.access", ""),
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
  connection: Connection
): IncomingWebhook => {
  const webhookRegex = /^https:\/\/hooks.slack.com\/services\/T\w*\/B\w*\/\w*$/;
  const { key, fields } = connection;
  if (key !== webhookUrlConnection.key) {
    throw new Error(
      "The connection provided to this step is not a webhook connection. Please ensure that the connection contains a webhook URL (and is not a Slack OAuth connection)."
    );
  }

  const { webhookUrl } = fields;
  if (!webhookRegex.exec(util.types.toString(webhookUrl))) {
    throw new ConnectionError(
      connection,
      `The Slack Webhook URL you provided, "${webhookUrl}", does not follow the format "https://hooks.slack.com/services/TXXXX/BXXXXX/XXXXXXX".`
    );
  }

  return new IncomingWebhook(util.types.toString(webhookUrl));
};
