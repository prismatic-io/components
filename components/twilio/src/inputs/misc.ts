import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const { debugRequest: _, ...baseRawRequestInputs } = httpClientInputs;

export const rawRequestInputs = {
  twilioConnection: connectionInput,
  ...baseRawRequestInputs,
  url: {
    ...baseRawRequestInputs.url,
    comments:
      "Input the path only (/Accounts/$TWILIO_ACCOUNT_SID/Messages.json), The base URL is already included (https://api.twilio.com/2010-04-01). For example, to connect to https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json, only /Accounts/$TWILIO_ACCOUNT_SID/Messages.json is entered in this field.",
    example: "/Accounts/$TWILIO_ACCOUNT_SID/Messages.json",
  },
};
