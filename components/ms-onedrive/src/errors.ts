import type { AxiosResponse } from "axios";

interface OneDriveError {
  response: {
    data: { error: { code: string; message: string } };
    status: string;
  };
  code: string;
}

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
