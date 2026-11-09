import { GOOGLE_ADS_ACCOUNT_TYPE } from "../constants";

export const buildAudienceDestination = (
  customerId: string,
  audienceId: string,
  managerCustomerId?: string,
): Record<string, unknown> => ({
  operatingAccount: {
    accountType: GOOGLE_ADS_ACCOUNT_TYPE,
    accountId: customerId,
  },
  productDestinationId: audienceId,
  ...(managerCustomerId !== undefined && {
    loginAccount: {
      accountType: GOOGLE_ADS_ACCOUNT_TYPE,
      accountId: managerCustomerId,
    },
  }),
});

export const buildConsent = (
  adUserData?: string,
  adPersonalization?: string,
): Record<string, string> | undefined => {
  if (adUserData === undefined && adPersonalization === undefined) {
    return undefined;
  }
  return {
    ...(adUserData !== undefined && { adUserData }),
    ...(adPersonalization !== undefined && { adPersonalization }),
  };
};
