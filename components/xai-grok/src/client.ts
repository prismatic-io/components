import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { API_BASE_URL } from "./constants";
import type {
  IChatCompletionParams,
  IChatCompletionResponse,
  IImageGenerationParams,
  IImageGenerationResponse,
  IMessageParams,
  IMessageResponse,
  IModelResponse,
  IModelsListResponse,
  XaiGrokClient,
} from "./interfaces";
import { getToken, validateConnection } from "./util";

export const createClient = (
  connection: Connection,
  debug: boolean,
): XaiGrokClient => {
  validateConnection(connection);
  const token = getToken(connection);

  const client = createHttpClient({
    baseUrl: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    debug,
  });

  return {
    createChatCompletion: async (params: IChatCompletionParams) => {
      const response = await client.post<IChatCompletionResponse>(
        "/chat/completions",
        params,
      );
      return response.data;
    },
    createMessage: async (params: IMessageParams) => {
      const response = await client.post<IMessageResponse>("/messages", params);
      return response.data;
    },
    createImage: async (params: IImageGenerationParams) => {
      const response = await client.post<IImageGenerationResponse>(
        "/images/generations",
        params,
      );
      return response.data;
    },
    listModels: async () => {
      const response = await client.get<IModelsListResponse>("/models");
      return response.data;
    },
    getModel: async (modelId: string) => {
      const response = await client.get<IModelResponse>(`/models/${modelId}`);
      return response.data;
    },
  };
};
