import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  accountId,
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
import { updateAccountExamplePayload } from "../../examplePayloads";

export const updateAccount = action({
  display: {
    description:
      "Updates a Merchant Center account. Any fields that are not provided are deleted from the resource.",
    label: "Update Account",
  },
  inputs: {
    connectionInput,
    merchantId,
    accountId,
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
  perform: async (
    _context,
    { connectionInput, merchantId, accountId, ...params },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.accounts.update({
      merchantId,
      accountId,
      requestBody: {
        id: null,
        ...params,
      },
    });
    return {
      data,
    };
  },
  examplePayload: updateAccountExamplePayload,
});
