import type { IChatCompletionParams } from "./IChatCompletionParams";
import type { IChatCompletionResponse } from "./IChatCompletionResponse";
import type { IImageGenerationParams } from "./IImageGenerationParams";
import type { IImageGenerationResponse } from "./IImageGenerationResponse";
import type { IMessageParams } from "./IMessageParams";
import type { IMessageResponse } from "./IMessageResponse";
import type { IModelResponse } from "./IModelResponse";
import type { IModelsListResponse } from "./IModelsListResponse";

export interface XaiGrokClient {
  createChatCompletion: (
    params: IChatCompletionParams,
  ) => Promise<IChatCompletionResponse>;
  createMessage: (params: IMessageParams) => Promise<IMessageResponse>;
  createImage: (
    params: IImageGenerationParams,
  ) => Promise<IImageGenerationResponse>;
  listModels: () => Promise<IModelsListResponse>;
  getModel: (modelId: string) => Promise<IModelResponse>;
}
