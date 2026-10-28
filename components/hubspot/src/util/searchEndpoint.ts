import {
  CUSTOM_OBJECT_PLACEHOLDER,
  hubspotPaths,
  SEARCH_ENDPOINT_PATTERN,
} from "../constants";
export const searchEndpointObjectType = (
  endpoint: string,
): string | undefined =>
  endpoint.match(SEARCH_ENDPOINT_PATTERN)?.[1].toLowerCase();
export const toCurrentSearchEndpoint = (endpoint: string): string => {
  const objectType = searchEndpointObjectType(endpoint);
  if (!objectType) {
    throw new Error(
      `Unrecognized search endpoint "${endpoint}". Expected /crm/v3/objects/<object type>/search or /crm/objects/<YYYY-MM>/<object type>/search.`,
    );
  }
  return hubspotPaths.objects(
    objectType === CUSTOM_OBJECT_PLACEHOLDER ? "{objectType}" : objectType,
    "/search",
  );
};
