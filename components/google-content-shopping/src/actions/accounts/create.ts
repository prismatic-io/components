import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  merchantId,
  name,
  kind,
  websiteUrl,
  adultContent,
  sellerId,
  users,
  youtubeChannelLinks,
  googleMyBusinessLink,
  businessInformation,
  automaticImprovements,
  adsLinks,
  cssId,
  labelIds,
  accountManagement,
  automaticLabelIds,
  conversionSettings,
} from "../../inputs";
import { createAccountExamplePayload } from "../../examplePayloads";

export const createAccount = action({
  display: {
    description: "Creates a Merchant Center sub-account.",
    label: "Create Account",
  },
  inputs: {
    connectionInput,
    merchantId,
    name: {
      ...name,
      comments: "Display name for the account.",
      required: true,
    },
    kind,
    websiteUrl,
    adultContent,
    sellerId,
    users,
    youtubeChannelLinks,
    googleMyBusinessLink,
    businessInformation,
    automaticImprovements,
    adsLinks,
    cssId,
    labelIds,
    accountManagement,
    automaticLabelIds,
    conversionSettings,
  },
  perform: async (_context, { connectionInput, merchantId, ...params }) => {
    const client = createClient(connectionInput);
    const { data } = await client.accounts.insert({
      merchantId,
      requestBody: {
        id: null,
        ...params,
      },
    });
    return {
      data,
    };
  },
  examplePayload: createAccountExamplePayload,
});
