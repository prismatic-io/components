import type { AxiosResponse } from "axios";

interface WooCommerceError {
  response: {
    data: { code: string; message: string; data: { status: string } };
    status: string;
  };
}

export const handleErrors = async (
  response: Promise<AxiosResponse<unknown, unknown>>,
): Promise<unknown> => {
  try {
    const { data, headers } = await response;

    return { data, headers };
  } catch (e) {
    const error = e as WooCommerceError;

    throw new Error(
      `Your action failed with Status: ${error?.response?.data.data.status} code: ${error?.response?.data?.code} message: ${error?.response?.data?.message}`,
    );
  }
};
