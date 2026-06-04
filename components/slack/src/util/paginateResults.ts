import type { WebClient } from "@slack/web-api";

export const paginateResults = async (
  client: WebClient,
  object: string,
  returnObject: string,
  method: string,
  params: Record<string, unknown>
) => {
  let cursor: string | undefined;
  const toReturn = [];
  do {
    const data = await client[object][method]({
      ...params,
      cursor: cursor,
      limit: 50,
    });

    cursor = data.response_metadata.next_cursor;
    toReturn.push(...data[returnObject]);
  } while (cursor);

  return {
    data: {
      ok: true,
      [returnObject]: toReturn,
    },
  };
};
