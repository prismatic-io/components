import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import myComponent from ".";
import { oracledbConnection } from "./connections";

const harness = createHarness(myComponent);
const connection = createConnection(oracledbConnection, {
  host: "localhost",
  port: "1521",
  database: "xe",
  username: "system",
  password: "MyPasswd123",
});

describe("Verify querying works properly", () => {
  test("Test a queries with no named parameters", async () => {
    const TABLE_NAME = "no_named_params";
    const queries = [
      `BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE ${TABLE_NAME}'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
      `CREATE TABLE ${TABLE_NAME} (id NUMBER(19) NOT NULL PRIMARY KEY, text VARCHAR2(4000), modified_time TIMESTAMP )`,
      `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (1, 'Some text', CURRENT_DATE)`,
      `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (2, 'Some more text', CURRENT_DATE)`,
      `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (3, 'Additional text', CURRENT_DATE)`,
    ];
    for (const query of queries) {
      await harness.action("query", { connection, query });
    }
    const result = await harness.action("query", {
      connection,
      query: `SELECT * FROM ${TABLE_NAME} ORDER BY id`,
    });
    expect(result?.data).toMatchObject([
      { ID: 1, TEXT: "Some text" },
      { ID: 2, TEXT: "Some more text" },
      { ID: 3, TEXT: "Additional text" },
    ]);
  });

  test("Test a queries with named parameters", async () => {
    const TABLE_NAME = "named_parameters";
    const queries = [
      [
        `BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE ${TABLE_NAME}'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
        [],
      ],
      [
        `CREATE TABLE ${TABLE_NAME} (id NUMBER(19) NOT NULL PRIMARY KEY, text VARCHAR2(4000), modified_time TIMESTAMP )`,
        [],
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        [
          { key: "id", value: "1" },
          { key: "text", value: "Some text" },
        ],
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        [
          { key: "id", value: 2 },
          { key: "text", value: "Some more text" },
        ],
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        [
          { key: "id", value: "3" },
          { key: "text", value: "Additional text" },
        ],
      ],
    ];
    for (const [query, namedParameters] of queries) {
      await harness.action("query", { connection, query, namedParameters });
    }
    const result = await harness.action("query", {
      connection,
      query: `SELECT * FROM ${TABLE_NAME} WHERE id = :id`,
      namedParameters: [{ key: "id", value: "2" }],
    });
    expect(result?.data).toMatchObject([{ ID: 2, TEXT: "Some more text" }]);
  });

  test("Test a queries with named parameter object", async () => {
    const TABLE_NAME = "named_parameters_object";
    const queries = [
      [
        `BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE ${TABLE_NAME}'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
        {},
      ],
      [
        `CREATE TABLE ${TABLE_NAME} (id NUMBER(19) NOT NULL PRIMARY KEY, text VARCHAR2(4000), modified_time TIMESTAMP )`,
        {},
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        { id: "1", text: "Some text" },
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        { id: 2, text: "Some more text" },
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        { id: "3", text: "Additional text" },
      ],
    ];
    for (const [query, namedParametersObject] of queries) {
      await harness.action("query", {
        connection,
        query,
        namedParametersObject,
      });
    }
    const result = await harness.action("query", {
      connection,
      query: `SELECT * FROM ${TABLE_NAME} WHERE id = :id`,
      namedParametersObject: { id: "3" },
    });
    expect(result?.data).toMatchObject([{ ID: 3, TEXT: "Additional text" }]);
  });

  test("Test a queries with named parameters and named parameters object together", async () => {
    const TABLE_NAME = "combined_parameters";
    const queries = [
      [
        `BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE ${TABLE_NAME}'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`,
        [],
        {},
      ],
      [
        `CREATE TABLE ${TABLE_NAME} (id NUMBER(19) NOT NULL PRIMARY KEY, text VARCHAR2(4000), modified_time TIMESTAMP )`,
        [],
        {},
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        [{ key: "id", value: "1" }],
        { text: "Some text" },
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        [{ key: "id", value: 2 }],
        { text: "Some more text" },
      ],
      [
        `INSERT INTO ${TABLE_NAME} (id, text, modified_time) VALUES (:id, :text, CURRENT_DATE)`,
        [{ key: "text", value: "Additional text" }],
        { id: "3" },
      ],
    ];
    for (const [query, namedParameters, namedParametersObject] of queries) {
      await harness.action("query", {
        connection,
        query,
        namedParameters,
        namedParametersObject,
      });
    }
    const result = await harness.action("query", {
      connection,
      query: `SELECT * FROM ${TABLE_NAME} WHERE id = :id OR text = :text`,
      namedParameters: [{ key: "text", value: "Some more text" }],
      namedParametersObject: { id: "3" },
    });
    expect(result?.data).toMatchObject([
      { ID: 2, TEXT: "Some more text" },
      { ID: 3, TEXT: "Additional text" },
    ]);
  });
});
