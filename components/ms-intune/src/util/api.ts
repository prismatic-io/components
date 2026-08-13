import type { InputFieldChoice } from "@prismatic-io/spectral";
import { API_URL, API_VERSIONS } from "../constants";
export const generateApiVersionModel = (): InputFieldChoice[] =>
  Object.keys(API_VERSIONS).map(
    (key): InputFieldChoice => ({
      label: key,
      value: API_VERSIONS[key as keyof typeof API_VERSIONS],
    }),
  );
export const getBaseUrl = (useBeta: boolean): string => {
  const version = useBeta ? API_VERSIONS.beta : API_VERSIONS.v1;
  return `${API_URL}${version}`;
};
