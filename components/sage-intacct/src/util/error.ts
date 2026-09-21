import type { SageApiResponse } from "../types";
export const checkSuccess = (status: unknown, errorMessage: string) => {
  if (status !== "success") throw new Error(errorMessage);
};
export const handleSageError = (responseFromSage: SageApiResponse): void => {
  const topLevelError = responseFromSage.response?.errormessage;
  const nestedError =
    responseFromSage.response?.operation?.result?.errormessage;
  const errorMessage = topLevelError || nestedError;
  if (errorMessage) {
    throw new Error(JSON.stringify({ data: errorMessage }));
  }
};
