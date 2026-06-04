import { Connection, ConnectionError } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { AxiosError } from "axios";

interface SignInResponse {
  credentials: {
    site: {
      id: string;
      contentUrl: string;
    };
    user: { id: string };
    token: string;
    estimatedTimeToExpiration: string;
  };
}

interface SignInParams {
  tableauConnection: Connection;
  apiVersion?: string;
}

export const signIn = async ({
  tableauConnection,
  apiVersion = "3.6",
}: SignInParams): Promise<SignInResponse> => {
  if (tableauConnection.key !== "privateKey") {
    throw new ConnectionError(
      tableauConnection,
      `Unsupported authorization method ${tableauConnection.key}.`,
    );
  }

  const client = createClient({
    baseUrl: `https://${tableauConnection.fields.hostName}/api/${apiVersion}/auth/signin`,
  });
  try {
    const signInResult = await client.post(
      "",
      {
        credentials: {
          personalAccessTokenName: tableauConnection.fields.tokenName,
          personalAccessTokenSecret: tableauConnection.fields.token,
          site: {
            contentUrl: tableauConnection.fields.siteId,
          },
        },
      },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      },
    );

    return await signInResult.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.debug(
      `Sign In failed, please check your connection configuration: ${axiosError.message}`,
    );
    throw error;
  }
};
