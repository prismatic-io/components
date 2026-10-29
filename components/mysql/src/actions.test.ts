import {
  ComponentTestHarness,
  createConnection,
} from "@prismatic-io/spectral/dist/testing";
import component from ".";
import { mySQLConnection } from "./connections";

const harness = new ComponentTestHarness(component);

const randomTableName = Math.random().toString(36).slice(-10);

const testConnection = createConnection(mySQLConnection, {
  host: "demo-endpoint.prismatic-dev.io",
  port: "3306",
  database: "prismaticdemo",
  username: "prismaticdemo",
  password: "Asdfasdf1",
});

describe("Test querying a MySQL server", () => {
  test("Test creating a table", async () => {
    await harness.action("query", {
      mySQLConnection: testConnection,
      queryField: `CREATE TABLE ${randomTableName} (id INT, mycolumn1 text, mycolumn2 text)`,
    });
  });

  test("Test inserting data into a table, no query params", async () => {
    await harness.action("query", {
      mySQLConnection: testConnection,
      queryField: `INSERT INTO ${randomTableName} (id, mycolumn1, mycolumn2) VALUES (1, 'foo', 'bar');`,
    });
  });

  test("Test inserting data into a table with query params", async () => {
    await harness.action("query", {
      mySQLConnection: testConnection,
      queryField: `INSERT INTO ${randomTableName} (id, mycolumn1, mycolumn2) VALUES (?, ?, ?);`,
      params: ["2", "foo2", "bar2"],
    });
  });

  test("Test bulk inserting data into a table with query reference", async () => {
    await harness.action("query", {
      mySQLConnection: testConnection,
      queryField: `INSERT INTO ${randomTableName} (id, mycolumn1, mycolumn2) VALUES ?;`,
      referenceParams: [
        [
          ["3", "foo3", "bar3"],
          ["4", "foo4", "bar4"],
        ],
      ],
    });
  });

  test("Test querying for data, no query params", async () => {
    const result = await harness.action("query", {
      mySQLConnection: testConnection,
      queryField: `SELECT id, mycolumn1, mycolumn2 FROM ${randomTableName}`,
    });
    expect(result.data).toEqual([
      { id: 1, mycolumn1: "foo", mycolumn2: "bar" },
      { id: 2, mycolumn1: "foo2", mycolumn2: "bar2" },
      { id: 3, mycolumn1: "foo3", mycolumn2: "bar3" },
      { id: 4, mycolumn1: "foo4", mycolumn2: "bar4" },
    ]);
  });

  test("Test querying for data, no query params", async () => {
    const result = await harness.action("query", {
      mySQLConnection: testConnection,
      queryField: `SELECT id, mycolumn1, mycolumn2 FROM ${randomTableName} WHERE id = ?`,
      params: ["2"],
    });
    expect(result.data).toEqual([
      { id: 2, mycolumn1: "foo2", mycolumn2: "bar2" },
    ]);
  });

  test("Test deleting a table", async () => {
    await harness.action("query", {
      mySQLConnection: testConnection,
      queryField: `DROP TABLE ${randomTableName}`,
    });
  });
});

describe("Test error handling", () => {
  test("Verify errors are thrown properly", async () => {
    await expect(
      harness.action("query", {
        mySQLConnection: testConnection,
        queryField: "SELECT * FROM TABLE NotARealTable",
      }),
    ).rejects.toThrow(
      "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'TABLE NotARealTable' at line 1",
    );
  });
});
