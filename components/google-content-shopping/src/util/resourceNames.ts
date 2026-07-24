export const accountResourceName = (account: string): string => {
  const trimmed = account.trim();
  return trimmed.startsWith("accounts/") ? trimmed : `accounts/${trimmed}`;
};
export const productIdSegment = (
  contentLanguage: string,
  feedLabel: string,
  offerId: string,
): string => `${contentLanguage}~${feedLabel}~${offerId}`;
export const productResourceName = (
  account: string,
  contentLanguage: string,
  feedLabel: string,
  offerId: string,
): string =>
  `${accountResourceName(account)}/products/${productIdSegment(contentLanguage, feedLabel, offerId)}`;
export const productInputResourceName = (
  account: string,
  contentLanguage: string,
  feedLabel: string,
  offerId: string,
): string =>
  `${accountResourceName(account)}/productInputs/${productIdSegment(contentLanguage, feedLabel, offerId)}`;
export const dataSourceResourceName = (
  account: string,
  dataSource: string,
): string => {
  const trimmed = dataSource.trim();
  return trimmed.startsWith("accounts/")
    ? trimmed
    : `${accountResourceName(account)}/dataSources/${trimmed}`;
};
