import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";

type BasicCredentials = {
  username: string;
  password: string;
};

export const getBasicAuthString = (twilioConnection: Connection): string => {
  const basicCredentials: BasicCredentials = { username: "", password: "" };
  switch (twilioConnection.key) {
    case "apiKeySecret":
      basicCredentials.username = util.types.toString(
        twilioConnection.fields?.apiKey,
      );
      basicCredentials.password = util.types.toString(
        twilioConnection.fields?.apiSecret,
      );

      break;

    case "basic":
      basicCredentials.username = util.types.toString(
        twilioConnection.fields?.username,
      );
      basicCredentials.password = util.types.toString(
        twilioConnection.fields?.password,
      );

      break;

    default:
      throw new ConnectionError(
        twilioConnection,
        `Unsupported authorization method: ${twilioConnection.key}`,
      );
  }
  const base64 = Buffer.from(
    `${basicCredentials.username}:${basicCredentials.password}`,
  ).toString("base64");
  return `Basic ${base64}`;
};
