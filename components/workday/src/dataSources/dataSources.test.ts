import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
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
  selectDataChangeExamplePayload,
  selectEventExamplePayload,
  selectInvoiceExamplePayload,
  selectMessageTemplateExamplePayload,
  selectOrganizationExamplePayload,
  selectPersonExamplePayload,
  selectSupplierInvoiceRequestExamplePayload,
  selectTableExamplePayload,
  selectWorkerExamplePayload,
} from "../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../testHelpers";
import { selectDataChange } from "./selectDataChange";
import { selectEvent } from "./selectEvent";
import { selectInvoice } from "./selectInvoice";
import { selectMessageTemplate } from "./selectMessageTemplate";
import { selectOrganization } from "./selectOrganization";
import { selectPerson } from "./selectPerson";
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
  expected: {
    result: {
      key: string;
      label: string;
    }[];
  };
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
    path: "/ccx/businessProcess/v1/events",
    listRecord: listEventsExamplePayload.data.data[0],
    keyField: "id",
    labelField: "descriptor",
    expected: selectEventExamplePayload,
  },
  {
    name: "selectInvoice",
    dataSource: selectInvoice,
    path: "/ccx/customerAccounts/v1/invoices",
    listRecord: listInvoicesExamplePayload.data.data[0],
    keyField: "id",
    labelField: "invoiceNumber",
    expected: selectInvoiceExamplePayload,
  },
  {
    name: "selectMessageTemplate",
    dataSource: selectMessageTemplate,
    path: "/ccx/connect/v2/messageTemplates",
    listRecord: listMessageTemplatesExamplePayload.data.data[0],
    keyField: "id",
    labelField: "name",
    expected: selectMessageTemplateExamplePayload,
  },
  {
    name: "selectOrganization",
    dataSource: selectOrganization,
    path: "/ccx/api/common/v1/organizations",
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
    path: "/ccx/person/v4/people",
    listRecord: listPeopleExamplePayload.data.data[0],
    keyField: "id",
    labelField: "id",
    expected: selectPersonExamplePayload,
  },
  {
    name: "selectSupplierInvoiceRequest",
    dataSource: selectSupplierInvoiceRequest,
    path: "/ccx/accountsPayable/v1/supplierInvoiceRequests",
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
    path: "/ccx/timeTracking/v7/workers",
    listRecord: getWorkersExamplePayload.data.data[0],
    keyField: "workerId",
    labelField: "descriptor",
    expected: selectWorkerExamplePayload,
  },
];
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
      .query(testCase.query ?? {})
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
      .query(testCase.query ?? {})
      .reply(200, { data: [] });
    const { result } = await run();
    expect(result).toEqual([]);
  });
});
