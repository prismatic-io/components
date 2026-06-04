import { createHarness } from "@prismatic-io/spectral/dist/testing";
import component from ".";
import { oauth as connectionType } from "./connections";

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE
  ? describe
  : describe.skip;

describeIntegrationTest("component", () => {
  const harness = createHarness(component);
  const connection = harness.connectionValue(connectionType);
  const customerId = "171-778-4019";

  it("should list accessible customers", async () => {
    const result = await harness.action("listCustomers", { connection });
    expect(result?.data).toBeDefined();
  });

  it("should paginate", async () => {
    const result1 = await harness.action("listCustomers", {
      connection,
      pageSize: 1,
    });
    const pageToken = (result1?.data as { nextPageToken: string })
      .nextPageToken;
    expect(pageToken).toBeDefined();

    const result2 = await harness.action("listCustomers", {
      connection,
      pageSize: 1,
      pageToken,
    });
    expect(
      (result1?.data as { results: unknown[] }).results[0],
    ).not.toStrictEqual((result2?.data as { results: unknown[] }).results[0]);
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

  it("should add conversions", async () => {
    const fn = async (): Promise<unknown> => {
      return await harness.action("manualConversions", {
        connection,
        customerId,
        clickId: "123xyz",
        conversionName: "customers/1717784019/conversionActions/912468183",
        conversionTime: "2022-04-12 22:44:44+00:00",
        conversionValue: 1,
        conversionCurrency: "USD",
      });
    };

    
    
    await expect(fn()).rejects.toThrow();
  });
});
