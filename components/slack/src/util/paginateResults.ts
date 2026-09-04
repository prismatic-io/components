import type { WebClient } from "@slack/web-api";
export const paginateResults = async (
  client: WebClient,
  object: string,
  returnObject: string,
  method: string,
  params: Record<string, unknown>,
) => {
  let cursor: string | undefined;
  const toReturn = [];
  const target = object
    .split(".")
    .reduce((accumulator, key) => accumulator[key], client);
  do {
    const data = await target[method]({
      ...params,
      cursor: cursor,
      limit: 50,
    });
    cursor = data.response_metadata?.next_cursor;
    toReturn.push(...(data[returnObject] ?? []));
  } while (cursor);
  return {
    data: {
      ok: true,
      [returnObject]: toReturn,
    },
  };
};
