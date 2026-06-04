import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const MAX_PAGE_SIZE_DEFAULT = 10000;
export const MAX_ITERATIONS_DEFAULT = 1000;




const TOKEN_MAX_ITEMS_MIN = 100;
const TOKEN_MAX_ITEMS_MAX = 1000;
const TOKEN_MAX_ITEMS_MULTIPLE = 100;
export const TOKEN_MAX_ITEMS_DEFAULT = 1000;

const validateTokenMaxItems = (maxItems: number): void => {
  if (
    !Number.isInteger(maxItems) ||
    maxItems < TOKEN_MAX_ITEMS_MIN ||
    maxItems > TOKEN_MAX_ITEMS_MAX ||
    maxItems % TOKEN_MAX_ITEMS_MULTIPLE !== 0
  ) {
    throw new Error(
      `paginateByToken: maxItems must be an integer in [${TOKEN_MAX_ITEMS_MIN}, ${TOKEN_MAX_ITEMS_MAX}] and a multiple of ${TOKEN_MAX_ITEMS_MULTIPLE} (got ${maxItems}).`,
    );
  }
};

export class PaginationGuardError extends Error {
  readonly code = "SMARTSHEET_PAGINATION_GUARD";

  constructor(
    readonly url: string,
    readonly iterations: number,
    readonly itemsCollected: number,
  ) {
    super(
      `Pagination exceeded ${iterations} iterations on ${url} ` +
        `(collected ${itemsCollected} items). Aborting to prevent runaway loop.`,
    );
    this.name = "PaginationGuardError";
  }
}

export interface BasePaginateOptions {
  query?: Record<string, unknown>;
  maxIterations?: number;
  onPage?: (pageIndex: number, items: unknown[]) => void;
}

export interface PaginateByTokenOptions extends BasePaginateOptions {
  maxItems?: number;
}

export interface PaginateByPageOptions extends BasePaginateOptions {
  pageSize?: number;
}

export const paginateByToken = async <T = unknown>(
  client: HttpClient,
  url: string,
  opts?: PaginateByTokenOptions,
): Promise<T[]> => {
  const { query, maxIterations, onPage, maxItems } = opts ?? {};
  const cap = Math.min(
    maxIterations ?? MAX_ITERATIONS_DEFAULT,
    MAX_ITERATIONS_DEFAULT,
  );
  const effectiveMaxItems = maxItems ?? TOKEN_MAX_ITEMS_DEFAULT;
  validateTokenMaxItems(effectiveMaxItems);

  const items: T[] = [];
  let lastKey: string | undefined;
  let iter = 0;

  do {
    if (iter >= cap) {
      throw new PaginationGuardError(url, iter, items.length);
    }

    const params: Record<string, unknown> = {
      ...query,
      paginationType: "token",
      maxItems: effectiveMaxItems,
    };
    if (lastKey !== undefined) {
      params.lastKey = lastKey;
    }

    const res = await client.get<Record<string, unknown>>(url, { params });
    const body: Record<string, unknown> = res.data ?? {};
    const pageItems: T[] = Array.isArray(body.data) ? (body.data as T[]) : [];
    items.push(...pageItems);
    onPage?.(iter, pageItems);
    iter++;

    const rawNextKey = body.lastKey;
    const nextKey =
      typeof rawNextKey === "string" && rawNextKey !== ""
        ? rawNextKey
        : undefined;

    if (nextKey !== undefined && nextKey === lastKey) {
      break;
    }

    lastKey = nextKey;
  } while (lastKey !== undefined);

  return items;
};

export const paginateByPage = async <T = unknown>(
  client: HttpClient,
  url: string,
  opts?: PaginateByPageOptions,
): Promise<T[]> => {
  const { query, maxIterations, onPage, pageSize: callerPageSize } = opts ?? {};
  const cap = Math.min(
    maxIterations ?? MAX_ITERATIONS_DEFAULT,
    MAX_ITERATIONS_DEFAULT,
  );

  const size =
    callerPageSize !== undefined && callerPageSize > 0
      ? callerPageSize
      : MAX_PAGE_SIZE_DEFAULT;

  const items: T[] = [];
  let page = 1;
  let iter = 0;

  for (;;) {
    if (iter >= cap) {
      throw new PaginationGuardError(url, iter, items.length);
    }

    const params: Record<string, unknown> = {
      ...query,
      page,
      pageSize: size,
    };

    const res = await client.get<Record<string, unknown>>(url, { params });
    const body: Record<string, unknown> = res.data ?? {};
    const pageItems: T[] = Array.isArray(body.data) ? (body.data as T[]) : [];
    items.push(...pageItems);
    onPage?.(iter, pageItems);
    iter++;

    if (pageItems.length === 0) break;
    if (pageItems.length < size) break;
    if (typeof body.totalPages === "number" && page >= body.totalPages) break;

    page++;
  }

  return items;
};
