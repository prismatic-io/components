// biome-ignore-all lint/suspicious/noExplicitAny: test mocks use any
import { ListIdentitiesCommand } from "@aws-sdk/client-ses";

jest.mock("aws-utils", () => ({
  paginateAwsResults: jest.fn(),
}));

import { paginateAwsResults } from "aws-utils";
import { getAllIdentities } from "./util";

const mockedPaginate = paginateAwsResults as jest.Mock;

describe("getAllIdentities", () => {
  beforeEach(() => {
    mockedPaginate.mockReset();
  });

  it("single page: returns identities", async () => {
    const identities = ["user@example.com", "example.com"];
    mockedPaginate.mockResolvedValueOnce({
      allItems: identities,
      lastResponse: { Identities: identities, $metadata: {} },
    });

    const client = { send: jest.fn() } as any;
    const result = await getAllIdentities({
      client,
      identityType: "EmailAddress" as any,
    });

    expect(mockedPaginate).toHaveBeenCalledTimes(1);
    expect(result.identities).toEqual(identities);
    expect(result.lastResponse).toHaveProperty("$metadata");
  });

  it("multi-page: accumulates identities", async () => {
    const allIdentities = ["a@test.com", "b@test.com", "test.com"];
    mockedPaginate.mockResolvedValueOnce({
      allItems: allIdentities,
      lastResponse: { Identities: ["test.com"], $metadata: {} },
    });

    const client = { send: jest.fn() } as any;
    const result = await getAllIdentities({
      client,
      identityType: undefined,
    });

    expect(result.identities).toEqual(allIdentities);
  });

  it("passes IdentityType to command factory", async () => {
    mockedPaginate.mockResolvedValueOnce({
      allItems: [],
      lastResponse: { Identities: [], $metadata: {} },
    });

    const client = { send: jest.fn() } as any;
    await getAllIdentities({
      client,
      identityType: "Domain" as any,
    });

    const callArgs = mockedPaginate.mock.calls[0][0];
    expect(callArgs.client).toBe(client);
    expect(callArgs.itemsKey).toBe("Identities");

    const command = callArgs.createCommand("next-tok");
    expect(command).toBeInstanceOf(ListIdentitiesCommand);
    expect(command.input).toMatchObject({
      IdentityType: "Domain",
      NextToken: "next-tok",
    });
  });
});
