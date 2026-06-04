





import type { Model } from "../interfaces/Model";
import type { PaginatedResponse } from "../interfaces/PaginatedResponse";

export const listModelsExamplePayload: { data: PaginatedResponse<Model> } = {
  data: {
    data: [
      {
        created_at: "2025-02-19T00:00:00Z",
        display_name: "Claude 3.7 Sonnet",
        id: "claude-3-7-sonnet-20250219",
        type: "model",
      },
    ],
    first_id: "claude-3-7-sonnet-20250219",
    has_more: false,
    last_id: "claude-3-5-haiku-20241022",
  },
};
