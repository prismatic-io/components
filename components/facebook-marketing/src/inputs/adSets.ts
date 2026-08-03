import { AD_SET_DEFAULTS } from "../constants";
import { adName, status, targeting } from "./ads";
import {
  adAccountId,
  adId,
  fetchAll,
  fields,
  myConnectionField,
  optionalValues,
  pagination,
  version,
} from "./common";
export const getAdSetInputs = {
  connection: myConnectionField,
  adId: {
    ...adId,
    label: "Ad Set Id",
    comments: "The ID of the Ad Set to retrieve.",
  },
  fields: {
    ...fields,
    default: AD_SET_DEFAULTS,
  },
  version,
};
export const updateAdSetInputs = {
  connection: myConnectionField,
  adId: {
    ...adId,
    label: "Ad Set Id",
    comments: "The ID of the Ad Set to update.",
  },
  adName: {
    ...adName,
    label: "Ad Set Name",
    comments: "Provide a name for the Ad Set.",
  },
  status: {
    ...status,
    label: "Ad Set Status",
    comments:
      "Provide a status for the Ad Set. During testing, it is recommended to set ad sets to a PAUSED status so as to not incur accidental spend.",
  },
  targeting,
  optionalValues,
  fields: { ...fields, default: AD_SET_DEFAULTS },
  version,
};
export const listAdSetsInAccountInputs = {
  connection: myConnectionField,
  adAccountId,
  fetchAll,
  pagination,
  fields: { ...fields, default: AD_SET_DEFAULTS },
  version,
};
