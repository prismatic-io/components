import { createRequire } from "node:module";
import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const requireCjs = createRequire(import.meta.url);
const axios = requireCjs("axios") as {
  defaults: { adapter: unknown };
  AxiosError: new (
    message: string,
    code: string,
    config: undefined,
    request: undefined,
    response: Partial<AxiosResponse>,
  ) => Error;
};

export const axiosError = (status: number, data: unknown): Error =>
  new axios.AxiosError(
    `Request failed with status code ${status}`,
    "ERR_BAD_REQUEST",
    undefined,
    undefined,
    { status, data, headers: {} },
  );

export interface StubbedResponse {
  status: number;
  data: unknown;
  headers?: Record<string, string>;
}

export const stubAxiosAdapter = (
  respond: (config: InternalAxiosRequestConfig) => StubbedResponse,
) => {
  const original = axios.defaults.adapter;
  const calls: InternalAxiosRequestConfig[] = [];

  const adapter: AxiosAdapter = async (config) => {
    calls.push(config);
    const { status, data, headers = {} } = respond(config);
    return {
      status,
      statusText: "OK",
      data,
      headers,
      config,
      request: {},
    } as AxiosResponse;
  };
  axios.defaults.adapter = adapter;

  return {
    calls,
    restore: () => {
      axios.defaults.adapter = original;
    },
  };
};
