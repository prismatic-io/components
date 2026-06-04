import type { CommentResponse } from "./shared";

export default interface ListAssetCommentsResponse {
  asset: {
    id: string;
    externalId: string;
    comments: {
      total: number;
      page: number;
      limit: number;
      hasNextPage: boolean;
      items: CommentResponse[];
    };
  };
}
