import type { AxiosResponse } from "axios";
import type { OneDriveError } from "./types";

export const handleErrors = async <T extends AxiosResponse>(
  response: Promise<T>,
): Promise<T["data"]> => {
  try {
    const result = await response;

    return result?.data;
  } catch (e) {
    const error = e as OneDriveError;
    throw new Error(
      `Your action failed with Status: ${error?.response?.status} code: ${
        error?.response?.data?.error?.code
      } message: ${error?.response?.data?.error?.message || error?.code}`,
    );
  }
};
