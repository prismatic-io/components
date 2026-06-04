import { paginateAwsResults } from "./pagination";

const createMockClient = (sendMock: jest.Mock) => ({ send: sendMock });

describe("paginateAwsResults", () => {
  let sendMock: jest.Mock;

  beforeEach(() => {
    sendMock = jest.fn();
  });

  it("single page: returns items when no NextToken in response", async () => {
    const items = [{ id: "1" }, { id: "2" }];
    sendMock.mockResolvedValueOnce({ Items: items, $metadata: {} });

    const client = createMockClient(sendMock);
    const result = await paginateAwsResults({
      client,
      createCommand: (token) => ({ NextToken: token }),
      itemsKey: "Items",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(result.allItems).toEqual(items);
    expect(result.lastResponse).toEqual({ Items: items, $metadata: {} });
  });

  it("multi-page: accumulates items across 3 pages", async () => {
    sendMock
      .mockResolvedValueOnce({ Items: [{ id: "1" }], NextToken: "token-2" })
      .mockResolvedValueOnce({ Items: [{ id: "2" }], NextToken: "token-3" })
      .mockResolvedValueOnce({ Items: [{ id: "3" }] });

    const client = createMockClient(sendMock);
    const result = await paginateAwsResults({
      client,
      createCommand: (token) => ({ NextToken: token }),
      itemsKey: "Items",
    });

    expect(sendMock).toHaveBeenCalledTimes(3);
    expect(result.allItems).toEqual([{ id: "1" }, { id: "2" }, { id: "3" }]);
    expect(result.lastResponse).toEqual({ Items: [{ id: "3" }] });
  });

  it("empty items: returns empty array on single page", async () => {
    sendMock.mockResolvedValueOnce({ Items: [], $metadata: {} });

    const client = createMockClient(sendMock);
    const result = await paginateAwsResults({
      client,
      createCommand: (token) => ({ NextToken: token }),
      itemsKey: "Items",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(result.allItems).toEqual([]);
  });

  it("missing itemsKey: gracefully returns empty array", async () => {
    sendMock.mockResolvedValueOnce({ $metadata: {} });

    const client = createMockClient(sendMock);
    const result = await paginateAwsResults({
      client,
      createCommand: (token) => ({ NextToken: token }),
      itemsKey: "NonExistentKey",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(result.allItems).toEqual([]);
  });
});
