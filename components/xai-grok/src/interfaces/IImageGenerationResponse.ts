export interface IImageGenerationResponse {
  data: Array<{
    url: string;
    revised_prompt: string;
  }>;
}
