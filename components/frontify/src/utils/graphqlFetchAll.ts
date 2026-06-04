import { DEFAULT_PAGE_SIZE } from "../inputs/pagination";

export const graphqlFetchAll = async ({
  client,
  query,
  params = {},
  hasNextPath = ["hasNextPage"],
}) => {
  const responses = [];
  let hasNext = true;
  let page = 1;

  while (hasNext) {
    const response = await client.request(query, {
      page,
      limit: DEFAULT_PAGE_SIZE,
      ...params,
    });

    hasNext = hasNextPath.reduce(
      (obj, key) => (obj ? obj[key] : false),
      response,
    );
    page += 1;

    responses.push(response);
  }

  return responses;
};
