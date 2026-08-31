import { createHarness } from "@prismatic-io/spectral/dist/testing";
import component from ".";
import { oauth as connectionType } from "./connections";
const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE
  ? describe
  : describe.skip;
describeIntegrationTest("component", () => {
  const harness = createHarness(component);
  let connection: ReturnType<typeof harness.connectionValue>;
  beforeAll(() => {
    connection = harness.connectionValue(connectionType);
  });
  const customerId = "171-778-4019";
  const managerCustomerId = customerId;
  it("should list accessible customers", async () => {
    const result = await harness.action("listAccessibleCustomers", {
      connection,
    });
    expect(result?.data).toBeDefined();
  });
  it("should list client accounts under a manager", async () => {
    const result = await harness.action("listCustomers", {
      connection,
      managerCustomerId,
    });
    expect(result?.data).toBeDefined();
  });
  it("should drain every page when fetching all", async () => {
    const result = await harness.action("listCustomers", {
      connection,
      managerCustomerId,
      fetchAll: true,
    });
    const data = result?.data as
      | {
          results?: unknown[];
          nextPageToken?: string;
        }
      | undefined;
    expect(Array.isArray(data?.results ?? [])).toBe(true);
    expect(data?.nextPageToken).toBeUndefined();
  });
  it("should get customer", async () => {
    const result = await harness.action("getCustomer", {
      connection,
      customerId,
    });
    expect(result?.data).toBeDefined();
  });
  it("should list customer's conversion actions", async () => {
    const result = await harness.action("getConversionAction", {
      connection,
      customerId,
    });
    expect(result?.data).toBeDefined();
  });
});
