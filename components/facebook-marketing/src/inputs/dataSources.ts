import { adAccountId, myConnectionField, version } from "./common";
export const selectAdAccountInputs = {
  connection: myConnectionField,
  version,
};
export const selectAdsInAccountInputs = {
  connection: myConnectionField,
  adAccountId: {
    ...adAccountId,
    dataSource: undefined,
  },
  version,
};
export const selectAdSetInputs = {
  connection: myConnectionField,
  adAccountId: {
    ...adAccountId,
    dataSource: undefined,
  },
  version,
};
export const selectAdCreativeInputs = {
  connection: myConnectionField,
  adAccountId: {
    ...adAccountId,
    dataSource: undefined,
  },
  version,
};
export const selectCampaignInAccountInputs = {
  connection: myConnectionField,
  adAccountId: {
    ...adAccountId,
    dataSource: undefined,
  },
  version,
};
export const selectBusinessNameInputs = {
  connection: myConnectionField,
  version,
};
