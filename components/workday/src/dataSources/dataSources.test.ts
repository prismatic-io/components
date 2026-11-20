import { invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import {
  getWorkersExamplePayload,
  listDataChangesExamplePayload,
  listEventsExamplePayload,
  listInvoicesExamplePayload,
  listMessageTemplatesExamplePayload,
  listOrganizationsExamplePayload,
  listPeopleExamplePayload,
  listSupplierInvoiceRequestsExamplePayload,
  listTablesExamplePayload,
  selectBusinessProcessTypeExamplePayload,
  selectCurrencyExamplePayload,
  selectCustomerExamplePayload,
  selectDataChangeExamplePayload,
  selectEventExamplePayload,
  selectInvoiceExamplePayload,
  selectMessageTemplateExamplePayload,
  selectNotificationTypeExamplePayload,
  selectOrganizationExamplePayload,
  selectPersonExamplePayload,
  selectSupervisoryOrganizationExamplePayload,
  selectSupplierInvoiceRequestExamplePayload,
  selectTableExamplePayload,
  selectWorkerExamplePayload,
} from "../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../testHelpers";
import { selectBusinessProcessType } from "./selectBusinessProcessType";
import { selectCurrency } from "./selectCurrency";
import { selectCustomer } from "./selectCustomer";
import { selectDataChange } from "./selectDataChange";
import { selectEvent } from "./selectEvent";
import { selectInvoice } from "./selectInvoice";
import { selectMessageTemplate } from "./selectMessageTemplate";
import { selectNotificationType } from "./selectNotificationType";
import { selectOrganization } from "./selectOrganization";
import { selectPerson } from "./selectPerson";
import { selectSupervisoryOrganization } from "./selectSupervisoryOrganization";
import { selectSupplierInvoiceRequest } from "./selectSupplierInvoiceRequest";
import { selectTable } from "./selectTable";
import { selectWorker } from "./selectWorker";

type AnyDataSource = Parameters<typeof invokeDataSource>[0];

interface DataSourceCase {
  name: string;
  dataSource: unknown;
  path: string;
  listRecord: Record<string, unknown>;
  keyField: string;
  labelField: string;
  expected: { result: { key: string; label: string }[] };
  extraParams?: Record<string, unknown>;
  query?: Record<string, string>;
}

const cases: DataSourceCase[] = [
  {
    name: "selectDataChange",
    dataSource: selectDataChange,
    path: "/ccx/api/prismAnalytics/v3/acme/dataChanges",
    listRecord: listDataChangesExamplePayload.data.data[0],
    keyField: "id",
    labelField: "displayName",
    expected: selectDataChangeExamplePayload,
    extraParams: { tenant: "acme" },
    query: { type: "summary" },
  },
  {
    name: "selectEvent",
    dataSource: selectEvent,
    path: "/ccx/api/businessProcess/v1/acme/events",
    listRecord: listEventsExamplePayload.data.data[0],
    keyField: "id",
    labelField: "descriptor",
    expected: selectEventExamplePayload,
    extraParams: { workerId: "w-1" },
    query: { worker: "w-1" },
  },
  {
    name: "selectInvoice",
    dataSource: selectInvoice,
    path: "/ccx/api/customerAccounts/v1/acme/invoices",
    listRecord: listInvoicesExamplePayload.data.data[0],
    keyField: "id",
    labelField: "invoiceNumber",
    expected: selectInvoiceExamplePayload,
  },
  {
    name: "selectMessageTemplate",
    dataSource: selectMessageTemplate,
    path: "/ccx/api/connect/v2/acme/messageTemplates",
    listRecord: listMessageTemplatesExamplePayload.data.data[0],
    keyField: "id",
    labelField: "name",
    expected: selectMessageTemplateExamplePayload,
  },
  {
    name: "selectOrganization",
    dataSource: selectOrganization,
    path: "/ccx/api/common/v1/acme/organizations",
    extraParams: { organizationTypeId: "orgtype-1" },
    query: { organizationType: "orgtype-1" },
    listRecord: listOrganizationsExamplePayload.data.data[0],
    keyField: "id",
    labelField: "descriptor",
    expected: selectOrganizationExamplePayload,
  },
  {
    name: "selectPerson",
    dataSource: selectPerson,
    path: "/ccx/api/person/v4/acme/people",
    listRecord: listPeopleExamplePayload.data.data[0],
    keyField: "id",
    labelField: "id",
    expected: selectPersonExamplePayload,
  },
  {
    name: "selectSupplierInvoiceRequest",
    dataSource: selectSupplierInvoiceRequest,
    path: "/ccx/api/accountsPayable/v1/acme/supplierInvoiceRequests",
    listRecord: listSupplierInvoiceRequestsExamplePayload.data.data[0],
    keyField: "id",
    labelField: "descriptor",
    expected: selectSupplierInvoiceRequestExamplePayload,
  },
  {
    name: "selectTable",
    dataSource: selectTable,
    path: "/ccx/api/prismAnalytics/v3/acme/tables",
    listRecord: listTablesExamplePayload.data.data[0],
    keyField: "id",
    labelField: "displayName",
    expected: selectTableExamplePayload,
    extraParams: { tenant: "acme" },
  },
  {
    name: "selectWorker",
    dataSource: selectWorker,
    path: "/ccx/api/timeTracking/v7/acme/workers",
    listRecord: getWorkersExamplePayload.data.data[0],
    keyField: "id",
    labelField: "descriptor",
    expected: selectWorkerExamplePayload,
  },
  {
    name: "selectNotificationType",
    dataSource: selectNotificationType,
    path: "/ccx/api/connect/v2/acme/notificationTypes",
    listRecord: {
      id: "1f3a5c7e9b0d42f4a6c8e0b2d4f6a8c0",
      descriptor: "Onboarding",
      referenceID: "Onboarding",
      parentCategory: { id: "5b7d9f1a3c5e47a9b1d3f5a7c9e1b3d5" },
    },
    keyField: "id",
    labelField: "descriptor",
    expected: selectNotificationTypeExamplePayload,
  },
  {
    name: "selectSupervisoryOrganization",
    dataSource: selectSupervisoryOrganization,
    path: "/ccx/api/common/v1/acme/supervisoryOrganizations",
    listRecord: {
      id: "f5074d9b65654ba68d2c4fafb5a1e4fd",
      descriptor: "Field Sales - Southern Europe (Jared Ellis)",
      code: "SUP-1042",
    },
    keyField: "id",
    labelField: "descriptor",
    expected: selectSupervisoryOrganizationExamplePayload,
  },
  {
    name: "selectCustomer",
    dataSource: selectCustomer,
    path: "/ccx/api/customerAccounts/v1/acme/customers",
    listRecord: {
      id: "0e44c92412d34b01ace61e80a47aaf6d",
      descriptor: "Global Modern Services, Inc. (USA)",
      name: "Global Modern Services, Inc. (USA)",
      Customer_ID: "CUS-000123",
    },
    keyField: "id",
    labelField: "descriptor",
    expected: selectCustomerExamplePayload,
  },
  {
    name: "selectCurrency",
    dataSource: selectCurrency,
    path: "/ccx/api/common/v1/acme/currencies",
    listRecord: {
      id: "9e996ffdd3e14da0ba7275d5fa27f3a7",
      descriptor: "USD",
      code: "USD",
      precision: 2,
    },
    keyField: "id",
    labelField: "descriptor",
    expected: selectCurrencyExamplePayload,
  },
  {
    name: "selectBusinessProcessType",
    dataSource: selectBusinessProcessType,
    path: "/ccx/api/businessProcess/v1/acme/types",
    listRecord: {
      id: "3cb0fdb7e3354a05b0a5e1c8a9d0f4b2",
      descriptor: "Hire",
    },
    keyField: "id",
    labelField: "descriptor",
    expected: selectBusinessProcessTypeExamplePayload,
  },
];

const firstPage = (query?: Record<string, string>) => ({
  ...query,
  limit: "100",
  offset: "0",
});

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});

describe.each(cases)("$name", (testCase) => {
  const run = () =>
    invokeDataSource(testCase.dataSource as AnyDataSource, {
      connection: oauthTestConnection(),
      ...testCase.extraParams,
    });

  it("returns {key,label} options sorted by label", async () => {
    const laterRecord = {
      ...testCase.listRecord,
      [testCase.keyField]: "~later",
      [testCase.labelField]: "~later",
    };
    nock(TEST_HOST)
      .get(testCase.path)
      .query(firstPage(testCase.query))
      .reply(200, { data: [laterRecord, testCase.listRecord], total: 2 });

    const { result } = await run();
    expect(result).toEqual([
      testCase.expected.result[0],
      { key: "~later", label: "~later" },
    ]);
  });

  it("returns an empty list when Workday has no records", async () => {
    nock(TEST_HOST)
      .get(testCase.path)
      .query(firstPage(testCase.query))
      .reply(200, { data: [] });

    const { result } = await run();
    expect(result).toEqual([]);
  });
});

describe("data source pagination", () => {
  it("reads every page until the reported total is reached", async () => {
    const path = "/ccx/api/timeTracking/v7/acme/workers";
    const page = (start: number, count: number) =>
      Array.from({ length: count }, (_, i) => ({
        id: `w${String(start + i).padStart(3, "0")}`,
        descriptor: `Worker ${String(start + i).padStart(3, "0")}`,
      }));
    nock(TEST_HOST)
      .get(path)
      .query({ limit: "100", offset: "0" })
      .reply(200, { data: page(0, 100), total: 150 })
      .get(path)
      .query({ limit: "100", offset: "100" })
      .reply(200, { data: page(100, 50), total: 150 });

    const { result } = await invokeDataSource(
      selectWorker as unknown as AnyDataSource,
      { connection: oauthTestConnection() },
    );
    const options = result as { key: string; label: string }[];
    expect(options).toHaveLength(150);
    expect(options[149]).toEqual({ key: "w149", label: "Worker 149" });
  });
});

describe("label fallbacks", () => {
  it("selectCustomer labels a row without descriptor by name, then Customer_ID", async () => {
    nock(TEST_HOST)
      .get("/ccx/api/customerAccounts/v1/acme/customers")
      .query(firstPage())
      .reply(200, {
        data: [
          { id: "c1", name: "Acme Corp" },
          { id: "c2", Customer_ID: "CUS-000456" },
        ],
        total: 2,
      });

    const { result } = await invokeDataSource(
      selectCustomer as unknown as AnyDataSource,
      { connection: oauthTestConnection() },
    );
    expect(result).toEqual([
      { key: "c1", label: "Acme Corp" },
      { key: "c2", label: "CUS-000456" },
    ]);
  });

  it("selectCurrency labels a row without descriptor by code", async () => {
    nock(TEST_HOST)
      .get("/ccx/api/common/v1/acme/currencies")
      .query(firstPage())
      .reply(200, { data: [{ id: "cur1", code: "EUR" }], total: 1 });

    const { result } = await invokeDataSource(
      selectCurrency as unknown as AnyDataSource,
      { connection: oauthTestConnection() },
    );
    expect(result).toEqual([{ key: "cur1", label: "EUR" }]);
  });

  it("selectWorker labels a row without descriptor by its Workday ID", async () => {
    nock(TEST_HOST)
      .get("/ccx/api/timeTracking/v7/acme/workers")
      .query(firstPage())
      .reply(200, { data: [{ id: "w1" }], total: 1 });

    const { result } = await invokeDataSource(
      selectWorker as unknown as AnyDataSource,
      { connection: oauthTestConnection() },
    );
    expect(result).toEqual([{ key: "w1", label: "w1" }]);
  });
});

describe("selectEvent without a worker", () => {
  it("returns an empty list without calling Workday", async () => {
    const { result } = await invokeDataSource(
      selectEvent as unknown as AnyDataSource,
      { connection: oauthTestConnection() } as never,
    );
    expect(result).toEqual([]);
  });
});
