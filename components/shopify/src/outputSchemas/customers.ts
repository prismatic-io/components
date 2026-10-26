import { countSchema, userErrorsArraySchema } from "./shared";
const restCustomerAddressSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    customer_id: { type: "number" as const },
    first_name: { type: ["string", "null"] },
    last_name: { type: ["string", "null"] },
    company: { type: ["string", "null"] },
    address1: { type: ["string", "null"] },
    address2: { type: ["string", "null"] },
    city: { type: ["string", "null"] },
    province: { type: ["string", "null"] },
    country: { type: ["string", "null"] },
    zip: { type: ["string", "null"] },
    phone: { type: ["string", "null"] },
    name: { type: ["string", "null"] },
    province_code: { type: ["string", "null"] },
    country_code: { type: ["string", "null"] },
    country_name: { type: ["string", "null"] },
    default: { type: "boolean" as const },
  },
};
const restCustomerSchema = {
  type: "object" as const,
  properties: {
    id: { type: ["number", "null"] },
    email: { type: "string" as const },
    created_at: { type: "string" as const },
    updated_at: { type: "string" as const },
    first_name: { type: "string" as const },
    last_name: { type: "string" as const },
    state: { type: "string" as const },
    last_order_id: { type: ["number", "null"] },
    note: { type: ["string", "null"] },
    verified_email: { type: "boolean" as const },
    multipass_identifier: { type: ["string", "null"] },
    tax_exempt: { type: "boolean" as const },
    tags: { type: ["string", "null"] },
    last_order_name: { type: ["string", "null"] },
    phone: { type: ["string", "null"] },
    addresses: { type: ["array", "null"], items: restCustomerAddressSchema },
    tax_exemptions: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    email_marketing_consent: {
      type: ["object", "null"],
      properties: {
        state: { type: "string" as const },
        opt_in_level: { type: ["string", "null"] },
        consent_updated_at: { type: ["string", "null"] },
      },
    },
    sms_marketing_consent: {
      type: ["object", "null"],
      properties: {
        state: { type: "string" as const },
        opt_in_level: { type: ["string", "null"] },
        consent_updated_at: { type: ["string", "null"] },
        consent_collected_from: { type: ["string", "null"] },
      },
    },
    admin_graphql_api_id: { type: "string" as const },
    default_address: restCustomerAddressSchema,
  },
};
const restMappedCustomerSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" as const },
    email: { type: "string" as const },
    created_at: { type: "string" as const },
    updated_at: { type: "string" as const },
    first_name: { type: "string" as const },
    last_name: { type: "string" as const },
    state: { type: "string" as const },
    last_order_id: { type: ["number", "null"] },
    note: { type: ["string", "null"] },
    verified_email: { type: "boolean" as const },
    multipass_identifier: { type: ["string", "null"] },
    tax_exempt: { type: "boolean" as const },
    tags: { type: "string" as const },
    last_order_name: { type: ["string", "null"] },
    phone: { type: ["string", "null"] },
    addresses: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: ["number", "null"] },
          customer_id: { type: "number" as const },
          first_name: { type: ["string", "null"] },
          last_name: { type: ["string", "null"] },
          company: { type: ["string", "null"] },
          address1: { type: ["string", "null"] },
          address2: { type: ["string", "null"] },
          city: { type: ["string", "null"] },
          province: { type: ["string", "null"] },
          country: { type: ["string", "null"] },
          zip: { type: ["string", "null"] },
          phone: { type: ["string", "null"] },
          name: { type: ["string", "null"] },
          province_code: { type: ["string", "null"] },
          country_code: { type: ["string", "null"] },
          country_name: { type: ["string", "null"] },
        },
      },
    },
    tax_exemptions: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    email_marketing_consent: {
      type: "object" as const,
      properties: {
        state: { type: "string" as const },
        opt_in_level: { type: ["string", "null"] },
        consent_updated_at: { type: ["string", "null"] },
      },
    },
    sms_marketing_consent: {
      type: ["object", "null"],
      properties: {
        state: { type: "string" as const },
        opt_in_level: { type: ["string", "null"] },
        consent_updated_at: { type: ["string", "null"] },
        consent_collected_from: { type: ["string", "null"] },
      },
    },
    admin_graphql_api_id: { type: "string" as const },
    default_address: {
      type: "object" as const,
      properties: {
        id: { type: ["number", "null"] },
        customer_id: { type: "number" as const },
        first_name: { type: ["string", "null"] },
        last_name: { type: ["string", "null"] },
        company: { type: ["string", "null"] },
        address1: { type: ["string", "null"] },
        address2: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        province: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        zip: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        name: { type: ["string", "null"] },
        province_code: { type: ["string", "null"] },
        country_code: { type: ["string", "null"] },
        country_name: { type: ["string", "null"] },
      },
    },
  },
};
const gqlCustomerSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    email: { type: "string" as const },
    createdAt: { type: "string" as const },
    updatedAt: { type: "string" as const },
    firstName: { type: "string" as const },
    lastName: { type: "string" as const },
    state: { type: "string" as const },
    lastOrder: { type: ["object", "null"] },
    note: { type: ["string", "null"] },
    verifiedEmail: { type: "boolean" as const },
    multipassIdentifier: { type: ["string", "null"] },
    taxExempt: { type: "boolean" as const },
    tags: { type: "array" as const, items: { type: "string" as const } },
    phone: { type: ["string", "null"] },
    addresses: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          firstName: { type: ["string", "null"] },
          lastName: { type: ["string", "null"] },
          company: { type: ["string", "null"] },
          address1: { type: ["string", "null"] },
          address2: { type: ["string", "null"] },
          city: { type: ["string", "null"] },
          province: { type: ["string", "null"] },
          country: { type: ["string", "null"] },
          zip: { type: ["string", "null"] },
          phone: { type: ["string", "null"] },
          name: { type: ["string", "null"] },
          provinceCode: { type: ["string", "null"] },
          countryCodeV2: { type: ["string", "null"] },
        },
      },
    },
    taxExemptions: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    emailMarketingConsent: {
      type: "object" as const,
      properties: {
        marketingState: { type: "string" as const },
        marketingOptInLevel: { type: ["string", "null"] },
        consentUpdatedAt: { type: ["string", "null"] },
      },
    },
    smsMarketingConsent: {
      type: ["object", "null"],
      properties: {
        marketingState: { type: "string" as const },
        marketingOptInLevel: { type: ["string", "null"] },
        consentUpdatedAt: { type: ["string", "null"] },
        consentCollectedFrom: { type: ["string", "null"] },
      },
    },
    defaultAddress: {
      type: "object" as const,
      properties: {
        id: { type: "string" as const },
        firstName: { type: ["string", "null"] },
        lastName: { type: ["string", "null"] },
        company: { type: ["string", "null"] },
        address1: { type: ["string", "null"] },
        address2: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        province: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        zip: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        name: { type: ["string", "null"] },
        provinceCode: { type: ["string", "null"] },
        countryCodeV2: { type: ["string", "null"] },
      },
    },
  },
};
export const createCustomerOutputSchema = {
  type: "object" as const,
  properties: {
    customer: restCustomerSchema,
  },
};
export const getCustomerOutputSchema = createCustomerOutputSchema;
export const listCustomersOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        customers: { type: "array" as const, items: restMappedCustomerSchema },
      },
    },
    pagination: {
      type: ["object", "null"],
      properties: {
        next: {
          type: "object" as const,
          properties: {
            page_info: { type: "string" as const },
            rel: { type: "string" as const },
          },
        },
      },
    },
    pageInfo: { type: ["string", "null"] },
    rel: { type: ["string", "null"] },
  },
};
export const countCustomersGqlOutputSchema = countSchema;
export const createAccountActivationURLGqlOutputSchema = {
  type: "object" as const,
  properties: {
    accountActivationUrl: { type: "string" as const },
    userErrors: userErrorsArraySchema,
  },
};
export const deleteCustomerGqlOutputSchema = {
  type: "object" as const,
  properties: {},
};
export const updateCustomerGqlOutputSchema = {
  type: "object" as const,
  properties: {
    userErrors: userErrorsArraySchema,
    customer: gqlCustomerSchema,
  },
};
export const getCustomerGqlOutputSchema = {
  type: "object" as const,
  properties: {
    customer: restMappedCustomerSchema,
  },
};
export const listCustomersGqlOutputSchema = listCustomersOutputSchema;
