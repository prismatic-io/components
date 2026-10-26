import { customerMapper } from "./customerMapper";
import { paginationMapper } from "./paginationMapper";
import { productImageMapper } from "./productImageMapper";
import { webhookMapper } from "./webhookMapper";
describe("customerMapper", () => {
  const gqlCustomer = {
    id: "gid://shopify/Customer/8000000000000",
    email: "test@example.com",
    createdAt: "2025-01-07T09:32:23Z",
    updatedAt: "2025-01-07T09:32:23Z",
    firstName: "John",
    lastName: "Doe",
    state: "DISABLED",
    lastOrder: { id: "gid://shopify/Order/555", name: "#555" },
    note: "VIP",
    verifiedEmail: true,
    multipassIdentifier: null,
    taxExempt: false,
    tags: ["wholesale", "vip"],
    phone: "+18005551234",
    addresses: [
      {
        id: "gid://shopify/MailingAddress/9000?model_name=CustomerAddress",
        firstName: "Jane",
        lastName: "Smith",
        company: null,
        address1: "123 Main St",
        address2: null,
        city: "Springfield",
        province: "Illinois",
        country: "United States",
        zip: "62704",
        phone: null,
        name: "Jane Smith",
        provinceCode: "IL",
        countryCodeV2: "US",
      },
    ],
    taxExemptions: [],
    emailMarketingConsent: {
      marketingState: "SUBSCRIBED",
      marketingOptInLevel: "SINGLE_OPT_IN",
      consentUpdatedAt: null,
    },
    smsMarketingConsent: null,
    defaultAddress: {
      id: "gid://shopify/MailingAddress/9000?model_name=CustomerAddress",
      firstName: "Jane",
      lastName: "Smith",
      company: null,
      address1: "123 Main St",
      address2: null,
      city: "Springfield",
      province: "Illinois",
      country: "United States",
      zip: "62704",
      phone: null,
      name: "Jane Smith",
      provinceCode: "IL",
      countryCodeV2: "US",
    },
  };
  test("converts GID to numeric ID", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.id).toBe(8000000000000);
  });
  test("converts camelCase to snake_case fields", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.first_name).toBe("John");
    expect(result.last_name).toBe("Doe");
    expect(result.created_at).toBe("2025-01-07T09:32:23Z");
    expect(result.verified_email).toBe(true);
    expect(result.tax_exempt).toBe(false);
  });
  test("joins tags array into comma-separated string", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.tags).toBe("wholesale,vip");
  });
  test("extracts last_order_id from nested lastOrder", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.last_order_id).toBe(555);
    expect(result.last_order_name).toBe("#555");
  });
  test("handles null lastOrder", () => {
    const result = customerMapper({ ...gqlCustomer, lastOrder: null });
    expect(result.last_order_id).toBe(null);
    expect(result.last_order_name).toBe(null);
  });
  test("maps address GIDs to numeric IDs", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.addresses[0].id).toBe(9000);
    expect(result.addresses[0].customer_id).toBe(8000000000000);
    expect(result.addresses[0].province_code).toBe("IL");
    expect(result.addresses[0].country_code).toBe("US");
  });
  test("maps emailMarketingConsent to snake_case", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.email_marketing_consent).toEqual({
      state: "SUBSCRIBED",
      opt_in_level: "SINGLE_OPT_IN",
      consent_updated_at: null,
    });
  });
  test("handles null smsMarketingConsent", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.sms_marketing_consent).toBe(null);
  });
  test("preserves admin_graphql_api_id as original GID", () => {
    const result = customerMapper(gqlCustomer);
    expect(result.admin_graphql_api_id).toBe(
      "gid://shopify/Customer/8000000000000",
    );
  });
});
describe("paginationMapper", () => {
  test("maps a page with more results", () => {
    const result = paginationMapper({
      hasNextPage: true,
      endCursor: "abc123",
    });
    expect(result.pagination).toEqual({
      next: { page_info: "abc123", rel: "next" },
    });
    expect(result.pageInfo).toBe("abc123");
    expect(result.rel).toBe('rel="next"');
  });
  test("maps a final page", () => {
    const result = paginationMapper({
      hasNextPage: false,
      endCursor: "xyz",
    });
    expect(result.pagination).toBe(null);
    expect(result.pageInfo).toBe(null);
    expect(result.rel).toBe(null);
  });
});
describe("webhookMapper", () => {
  test("converts webhook subscription to REST format", () => {
    const result = webhookMapper({
      id: "gid://shopify/WebhookSubscription/12345",
      endpoint: { callbackUrl: "https://example.com/webhook" },
      topic: "ORDERS_CREATE",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
      format: "JSON",
      includeFields: [],
      metafieldNamespaces: [],
      apiVersion: { displayName: "2026-07" },
    });
    expect(result.id).toBe(12345);
    expect(result.address).toBe("https://example.com/webhook");
    expect(result.topic).toBe("orders/create");
    expect(result.format).toBe("json");
    expect(result.api_version).toBe("2026-07");
  });
});
describe("productImageMapper", () => {
  test("maps product image to REST format", () => {
    const result = productImageMapper(
      {
        id: "gid://shopify/MediaImage/111",
        alt: "Alt text",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:01Z",
        image: {
          width: 800,
          height: 600,
          url: "https://cdn.shopify.com/img.jpg",
        },
      },
      999,
      3,
    );
    expect(result.id).toBe(111);
    expect(result.alt).toBe("Alt text");
    expect(result.position).toBe(3);
    expect(result.product_id).toBe(999);
    expect(result.width).toBe(800);
    expect(result.height).toBe(600);
    expect(result.src).toBe("https://cdn.shopify.com/img.jpg");
    expect(result.admin_graphql_api_id).toBe("gid://shopify/MediaImage/111");
  });
  test("handles null image", () => {
    const result = productImageMapper(
      {
        id: "gid://shopify/MediaImage/222",
        alt: null,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:01Z",
        image: null,
      },
      999,
      1,
    );
    expect(result.width).toBe(null);
    expect(result.height).toBe(null);
    expect(result.src).toBeUndefined();
  });
});
