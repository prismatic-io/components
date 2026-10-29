import type { PaginateAwsOptions } from "../interfaces/PaginateAwsOptions";

export const paginateAwsResults = async <TOutput>(
  options: PaginateAwsOptions<TOutput>,
): Promise<{ allItems: unknown[]; lastResponse: TOutput }> => {
  const { createCommand, client, itemsKey } = options;
  const allItems: unknown[] = [];
  let nextToken: string | undefined;
  let lastResponse: TOutput;

  do {
    const command = createCommand(nextToken);
    const response = await client.send(command);
    lastResponse = response;

    const record = response as Record<string, unknown>;
    const items = record[itemsKey];
    allItems.push(...(Array.isArray(items) ? items : []));

    nextToken = record.NextToken as string | undefined;
  } while (nextToken);

  return { allItems, lastResponse };
};
