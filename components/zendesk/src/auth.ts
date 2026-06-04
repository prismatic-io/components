import { URL } from "node:url";
import { util, type Connection, ConnectionError } from "@prismatic-io/spectral";
import {
  type HttpClient,
  createClient as createHttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import {
  createClient as createZendeskClient,
  type ZendeskClientOptions,
} from "node-zendesk";
import {
  apiTokenConnection,
  zendeskConnection as oauth2Connection,
  oauth2TemplateConnection,
} from "./connections";
import type { CreateClientProps, ZendeskConnectionProps } from "./types";
import { cleanZendeskDomain } from "./helper";

export const getConnectionProps = ({
  zendeskConnection,
  username,
}: CreateClientProps): Partial<ZendeskConnectionProps> => {
  switch (zendeskConnection.key) {
    case oauth2TemplateConnection.key:
    case oauth2Connection.key: {
      
      const tokenUrlRegex = /(.*)\/oauth\/tokens/;
      const tokenUrl = util.types.toString(zendeskConnection.fields.tokenUrl);
      const baseUrl = tokenUrlRegex.exec(tokenUrl)?.[1];
      if (!baseUrl) {
        throw new ConnectionError(
          zendeskConnection,
          `Unable to extract Zendesk base from ${zendeskConnection.fields.tokenUrl}. Does your token URL end in "/oauth/tokens"?`,
        );
      }
      const url = new URL(tokenUrl);
      const subdomain = url.hostname.split(".")[0];

      return {
        username: username ? username : "",
        token: util.types.toString(zendeskConnection.token?.access_token),
        remoteUri: `${baseUrl}/api/v2`,
        subdomain,
        oauth: true,
      };
    }
    case apiTokenConnection.key: {
      const zendeskDomain = cleanZendeskDomain(
        util.types.toString(zendeskConnection.fields.domain),
      );
      const username = util.types.toString(zendeskConnection.fields.username);
      const password = util.types.toString(zendeskConnection.fields.apiToken);

      return {
        remoteUri: `${zendeskDomain}/api/v2`,
        username: util.types.toString(zendeskConnection.fields.username),
        
        token: Buffer.from(`${username}/token:${password}`).toString("base64"),
        oauth: false,
        subdomain: new URL(zendeskDomain).hostname.split(".")[0],
      };
    }

    default:
      throw new ConnectionError(
        zendeskConnection,
        `Unsupported authorization method specified: ${zendeskConnection?.key}`,
      );
  }
};

export const createClient = ({
  zendeskConnection,
  username,
  debug,
}: CreateClientProps) => {
  const clientOptions: ZendeskClientOptions = {
    ...getConnectionProps({ zendeskConnection, username }),
    
    ...(zendeskConnection.key === apiTokenConnection.key && {
      token: util.types.toString(zendeskConnection.fields.apiToken),
    }),
    debug,
  };

  return createZendeskClient(clientOptions);
};



export const rawHttpClient = (
  zendeskConnection: Connection,
  debug = false,
): HttpClient => {
  const { token, remoteUri, oauth } = getConnectionProps({ zendeskConnection });

  return createHttpClient({
    baseUrl: remoteUri,
    headers: {
      authorization: oauth ? `Bearer ${token}` : `Basic ${token}`,
    },
    debug,
  });
};
