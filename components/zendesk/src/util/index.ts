import { type InputFieldDefinition, util } from "@prismatic-io/spectral";
import type {
  IncrementalTicketsResponse,
  PaginatedResponse,
  Ticket,
} from "../types";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const cleanFile = (value: unknown) =>
  value ? util.types.toBufferDataPayload(value) : undefined;

export const cleanString = (value: unknown) =>
  util.types.toString(value) || undefined;

export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanValueList = (value: unknown) => {
  return (value as unknown[]).map((string: unknown) =>
    util.types.toString(string),
  );
};

export const cleanValueListToString = (value: unknown): string => {
  return (value as unknown[])
    .map((string: unknown) => util.types.toString(string))
    .join(",");
};

export const cleanValueListToEncodedString = (value: unknown): string => {
  return (value as unknown[])
    .map((string: unknown) => util.types.toString(string))
    .map((string: string) => encodeURIComponent(string))
    .join(",");
};

export const cleanFunctionForLimitInput = (value: unknown): number => {
  const MAX_NUMBER_PER_PAGE = 100;
  const num = util.types.toNumber(value);

  return num > MAX_NUMBER_PER_PAGE ? MAX_NUMBER_PER_PAGE : num;
};

export const paginateResults = async <T>(
  client: HttpClient,
  url: string,
  resultsArray: T[],
  key: string,
  pageSize = 30,
): Promise<T[]> => {
  const NEXT_URL_SPLIT_INDEX = 1;
  const SPLIT_STRING_WITHOUT_PAGE_SIZE = 0;
  const splitPageSizeString = /&/;
  let nextUrl = url;
  const shouldPaginate = true;

  do {
    const { data } = await client.get<PaginatedResponse<T>>(nextUrl, {
      params: {
        "page[size]": pageSize,
      },
    });

    resultsArray.push(...data[key]);

    if (!data?.meta?.has_more) {
      break;
      // biome-ignore lint: This is needed for the pagination to work.
    } else {
      
      
      
      nextUrl = data.links.next
        .split(/v2/g)
        [NEXT_URL_SPLIT_INDEX].split(splitPageSizeString)[
        SPLIT_STRING_WITHOUT_PAGE_SIZE
      ];
    }
  } while (shouldPaginate);

  return resultsArray;
};





export const drainTicketsStream = async (
  client: HttpClient,
  startCursor: string | undefined,
  startTime: number,
): Promise<{ tickets: Ticket[]; afterCursor: string }> => {
  const allTickets: Ticket[] = [];
  let cursor = startCursor;
  let afterCursor = startCursor ?? "";

  while (true) {
    const params: Record<string, string | number> = { per_page: 1000 };
    if (cursor) {
      params.cursor = cursor;
    } else {
      params.start_time = startTime;
    }

    const { data } = await client.get<IncrementalTicketsResponse>(
      "/incremental/tickets/cursor",
      { params },
    );

    if (Array.isArray(data.tickets)) {
      allTickets.push(...data.tickets);
    }
    afterCursor = data.after_cursor;
    cursor = data.after_cursor;

    if (data.end_of_stream) {
      break;
    }
  }

  return { tickets: allTickets, afterCursor };
};





export const partitionTicketsByTimestamp = (
  tickets: Ticket[],
  sinceDate: Date,
): { created: Ticket[]; updated: Ticket[] } => {
  const created: Ticket[] = [];
  const updated: Ticket[] = [];

  for (const ticket of tickets) {
    const createdAt = ticket.created_at ? new Date(ticket.created_at) : null;
    const updatedAt = ticket.updated_at ? new Date(ticket.updated_at) : null;

    if (createdAt && createdAt > sinceDate) {
      created.push(ticket);
    } else if (updatedAt && updatedAt > sinceDate) {
      updated.push(ticket);
    } else if (!createdAt && !updatedAt) {
      updated.push(ticket);
    }
  }

  return { created, updated };
};

export const convertBooleanInputIntoUpdateInput = (
  input: InputFieldDefinition,
): InputFieldDefinition => {
  return {
    label: input.label,
    comments: input.comments,
    type: "string",
    required: false,
    model: ["True", "False"].map((choice) => ({
      label: choice,
      value: choice.toLowerCase(),
    })),
    clean: (value: unknown): boolean | undefined => {
      if (value === "true") {
        return true;
      }

      if (value === "false") {
        return false;
      }

      return undefined;
    },
  };
};
