import { ListStatementsCommand } from "@aws-sdk/client-redshift-data";

jest.mock("aws-utils", () => ({
  assumeRoleConnection: { key: "assume-role" },
  paginateAwsResults: jest.fn(),
}));

import { getAllStatements } from "./util";
import { paginateAwsResults } from "aws-utils";

const mockedPaginate = paginateAwsResults as jest.Mock;

describe("getAllStatements", () => {
  beforeEach(() => {
    mockedPaginate.mockReset();
  });

  it("single page: returns statements from paginateAwsResults", async () => {
    const statements = [{ Id: "stmt-1" }, { Id: "stmt-2" }];
    mockedPaginate.mockResolvedValueOnce({
      allItems: statements,
      lastResponse: { Statements: statements, $metadata: {} },
    });

    const client = { send: jest.fn() } as any;
    const result = await getAllStatements({
      client,
      databaseName: "analytics",
      workgroupName: "wg-1",
      clusterIdentifier: undefined,
      status: "FINISHED" as any,
      statementName: undefined,
    });

    expect(mockedPaginate).toHaveBeenCalledTimes(1);
    expect(result.allStatements).toEqual(statements);
    expect(result.lastResponse).toHaveProperty("$metadata");
  });

  it("returns correct shape { allStatements, lastResponse }", async () => {
    mockedPaginate.mockResolvedValueOnce({
      allItems: [{ Id: "s1" }],
      lastResponse: { Statements: [{ Id: "s1" }] },
    });

    const client = { send: jest.fn() } as any;
    const result = await getAllStatements({
      client,
      databaseName: "db",
      workgroupName: undefined,
      clusterIdentifier: "cluster-1",
      status: "ALL" as any,
      statementName: undefined,
    });

    expect(result).toHaveProperty("allStatements");
    expect(result).toHaveProperty("lastResponse");
    expect(Array.isArray(result.allStatements)).toBe(true);
  });

  it("passes all params to paginateAwsResults with correct itemsKey and command", async () => {
    mockedPaginate.mockResolvedValueOnce({
      allItems: [],
      lastResponse: { Statements: [] },
    });

    const client = { send: jest.fn() } as any;
    await getAllStatements({
      client,
      databaseName: "mydb",
      workgroupName: "wg",
      clusterIdentifier: "cluster",
      status: "FINISHED" as any,
      statementName: "report",
    });

    const callArgs = mockedPaginate.mock.calls[0][0];
    expect(callArgs.client).toBe(client);
    expect(callArgs.itemsKey).toBe("Statements");

    
    const command = callArgs.createCommand("test-token");
    expect(command).toBeInstanceOf(ListStatementsCommand);
    expect(command.input).toMatchObject({
      Database: "mydb",
      WorkgroupName: "wg",
      ClusterIdentifier: "cluster",
      Status: "FINISHED",
      StatementName: "report",
      MaxResults: 100,
      NextToken: "test-token",
    });
  });
});
