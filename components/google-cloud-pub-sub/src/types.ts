export type Version = "v1";

export type PaginateResult<T> = {
  nextPageToken?: string;
  [key: string]: T[] | string | undefined;
};

export type GoogleListMethod = { data: { nextPageToken?: string; [key: string]: unknown } };

export type GenericListMethod<TParams> = (
  params: TParams & { pageToken?: string },
) => Promise<unknown> | PromiseLike<unknown>;

export type SortableByName = { name?: string | null };
