import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import Twilio from "twilio";

export const createAuthorizedClient = (
  twilioConnection: Connection,
  debug: boolean,
) => {
  const logLevel = debug ? "debug" : undefined;
  switch (twilioConnection.key) {
    case "apiKeySecret": {
      return Twilio(
        util.types.toString(twilioConnection.fields?.apiKey),
        util.types.toString(twilioConnection.fields?.apiSecret),
        {
          accountSid: util.types.toString(twilioConnection.fields?.accountSid),
          logLevel,
        },
      );
    }

    case "basic": {
      return Twilio(
        util.types.toString(twilioConnection.fields?.username),
        util.types.toString(twilioConnection.fields?.password),
        { logLevel },
      );
    }

    default:
      throw new ConnectionError(
        twilioConnection,
        `Unsupported authorization method: ${twilioConnection.key}`,
      );
  }
};
