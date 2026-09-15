import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { api, connection, prefix } from "../testHelpers";
import { selectCustomerContact } from "./selectCustomerContact";
import { selectCustomers } from "./selectCustomers";
import { selectJob } from "./selectJob";
const page = (records: unknown[], hasMore = false) => ({
  data: records,
  hasMore,
});
afterEach(() => nock.cleanAll());
describe("selectCustomers (sorted by name)", () => {
  test("returns key/label pairs sorted by customer name", async () => {
    api()
      .get(`${prefix("crm")}/customers`)
      .query(true)
      .reply(
        200,
        page([
          { id: 2, name: "Zenith HVAC" },
          { id: 1, name: "Acme Plumbing" },
        ]),
      );
    const { result } = await invokeDataSource(selectCustomers, { connection });
    expect(result).toEqual([
      { key: "1", label: "Acme Plumbing (ID: 1)" },
      { key: "2", label: "Zenith HVAC (ID: 2)" },
    ]);
  });
  test("returns an empty picklist when the tenant has no customers", async () => {
    api()
      .get(`${prefix("crm")}/customers`)
      .query(true)
      .reply(200, page([]));
    const { result } = await invokeDataSource(selectCustomers, { connection });
    expect(result).toEqual([]);
  });
  test("stops after nine pages even while the API keeps reporting more", async () => {
    const pagesRequested: string[] = [];
    api()
      .get(`${prefix("crm")}/customers`)
      .query((q) => {
        pagesRequested.push(q.page as string);
        return true;
      })
      .times(30)
      .reply(200, page([{ id: 1, name: "Acme Plumbing" }], true));
    const { result } = await invokeDataSource(selectCustomers, { connection });
    expect(pagesRequested).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ]);
    expect(result).toHaveLength(9);
  });
});
describe("selectJob (sorted by id)", () => {
  test("returns key/label pairs sorted by job id", async () => {
    api()
      .get(`${prefix("jpm")}/jobs`)
      .query(true)
      .reply(200, page([{ id: 24816 }, { id: 24815 }]));
    const { result } = await invokeDataSource(selectJob, { connection });
    expect(result).toEqual([
      { key: "24815", label: "#24815" },
      { key: "24816", label: "#24816" },
    ]);
  });
  test("returns an empty picklist when the tenant has no jobs", async () => {
    api()
      .get(`${prefix("jpm")}/jobs`)
      .query(true)
      .reply(200, page([]));
    const { result } = await invokeDataSource(selectJob, { connection });
    expect(result).toEqual([]);
  });
});
describe("selectCustomerContact (sibling input in the path, unsorted)", () => {
  test("builds the path from the customerId sibling input and preserves API order", async () => {
    api()
      .get(`${prefix("crm")}/customers/12345/contacts`)
      .query(true)
      .reply(
        200,
        page([
          { id: 9, type: "Phone", value: "5125550100" },
          { id: 3, type: "Email", value: "ops@example.com" },
        ]),
      );
    const { result } = await invokeDataSource(selectCustomerContact, {
      connection,
      customerId: "12345",
    });
    expect(result).toEqual([
      { key: "9", label: "Phone: 5125550100" },
      { key: "3", label: "Email: ops@example.com" },
    ]);
  });
  test("returns an empty picklist when the customer has no contacts", async () => {
    api()
      .get(`${prefix("crm")}/customers/12345/contacts`)
      .query(true)
      .reply(200, page([]));
    const { result } = await invokeDataSource(selectCustomerContact, {
      connection,
      customerId: "12345",
    });
    expect(result).toEqual([]);
  });
});
