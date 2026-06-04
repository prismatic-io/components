import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { addUrlTagsToCreative } from "./actions/addURLTagsToCreative";
import { businessByName } from "./actions/business";
import { createAd } from "./actions/createAd";
import { createCampaign } from "./actions/createCampaign";
import { createConversion } from "./actions/createConversion";
import { createMultipleConversions } from "./actions/createMultipleConversions";
import { deleteAd } from "./actions/deleteAd";
import { getAd } from "./actions/getAd";
import { getAdCreative } from "./actions/getAdCreative";
import { listAdLeads } from "./actions/getAdLeads";
import { getAdPreview } from "./actions/getAdPreview";
import { getAdSet } from "./actions/getAdSet";
import { getAdAccount } from "./actions/getAddAccount";
import { getCurrentUser } from "./actions/getCurrentUser";
import { getUserById } from "./actions/getUserById";
import { listAddAccounts } from "./actions/listAdAccounts";
import { listAdCreatives } from "./actions/listAdCreatives";
import { listAdSetsInAccount } from "./actions/listAdSetsInAccount";
import { listAdsInAccount } from "./actions/listAdsInAccount";
import { listAdsInAdset } from "./actions/listAdsInAdset";
import { listCampaignsInAccount } from "./actions/listCampaignsInAccount";
import { rawRequest } from "./actions/rawRequest";
import { updateAd } from "./actions/updateAd";
import { updateAdCreative } from "./actions/updateAdCreative";
import { updateAdSet } from "./actions/updateAdSet";
import webhooks from "./actions/webhooks";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "facebook-marketing",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/facebook-marketing/",
  display: {
    category: "Application Connectors",
    label: "Meta Ads",
    description: "Interact with ads and adsets in your Meta Ads account.",
    iconPath: "icon.png",
  },
  actions: {
    addUrlTagsToCreative,
    businessByName,
    createAd,
    createCampaign,
    createConversion,
    createMultipleConversions,
    deleteAd,
    getAd,
    getAdAccount,
    getAdCreative,
    getAdPreview,
    getAdSet,
    getCurrentUser,
    getUserById,
    listAdCreatives,
    listAddAccounts,
    listAdLeads,
    listAdSetsInAccount,
    listAdsInAccount,
    listAdsInAdset,
    listCampaignsInAccount,
    rawRequest,
    updateAd,
    updateAdCreative,
    updateAdSet,
    ...webhooks,
  },
  hooks: { error: handleErrors },
  connections,
  dataSources,
  triggers,
});
