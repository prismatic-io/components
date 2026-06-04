import { action, util } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import {
  accountName,
  accountNumber,
  addressLine1,
  addressLine2,
  addressTypeId,
  bankAccountId,
  bic,
  city,
  connection,
  contactId,
  contactPersonId,
  contactTypeIds,
  countryId,
  creditDays,
  creditLimit,
  currencyId,
  defaultPurchaseLedgerId,
  defaultSalesLedgerId,
  defaultSalesTaxRateId,
  iban,
  isMainAddress,
  itemsPerPage,
  name,
  notes,
  page,
  postalCode,
  reference,
  region,
  sortCode,
  sourceGuid,
  taxNumber,
  updated_or_created_since,
} from "../inputs";

export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "List all contacts",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/contacts", {
      params: {
        items_per_page: util.types.toInt(params.itemsPerPage) || undefined,
        page: util.types.toInt(params.page) || undefined,
        updated_or_created_since: util.types.toString(params.updated_or_created_since) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, itemsPerPage, page, updated_or_created_since },
});

export const listContactTypes = action({
  display: {
    label: "List Contact Types",
    description: "List all contact types",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/contact_types", {
      params: {
        items_per_page: util.types.toInt(params.itemsPerPage) || undefined,
        page: util.types.toInt(params.page) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, itemsPerPage, page },
});

export const listContactPeople = action({
  display: {
    label: "List Contact People",
    description: "List all contact people",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/contact_persons", {
      params: {
        items_per_page: util.types.toInt(params.itemsPerPage) || undefined,
        page: util.types.toInt(params.page) || undefined,
        updated_or_created_since: util.types.toString(params.updated_or_created_since) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, itemsPerPage, page, updated_or_created_since },
});

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Get the information and metadata of a contact by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get(`/contacts/${params.contactId}`);

    return {
      data,
    };
  },
  inputs: { connection, contactId },
});

export const getContactPerson = action({
  display: {
    label: "Get Contact Person",
    description: "Get the information and metadata of a contact person by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get(`/contact_persons/${params.contactPersonId}`);

    return {
      data,
    };
  },
  inputs: { connection, contactPersonId },
});

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "Delete an existing contact by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.delete(`/contacts/${params.contactId}`);

    return {
      data,
    };
  },
  inputs: { connection, contactId },
});

export const deleteContactPerson = action({
  display: {
    label: "Delete Contact Person",
    description: "Delete an existing contact person by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.delete(`/contacts/${params.contactPersonId}`);

    return {
      data,
    };
  },
  inputs: { connection, contactPersonId },
});

export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Create a new contact",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const deliveryAddress = {
      address_line_1: util.types.toString(params.deliveryLine1) || undefined,
      address_line_2: util.types.toString(params.deliveryLine2) || undefined,
      city: util.types.toString(params.deliveryCity) || undefined,
      postal_code: util.types.toString(params.deliveryPostalCode) || undefined,
      country_id: util.types.toString(params.deliveryCountryId) || undefined,
      bank_account_id: util.types.toString(params.deliveryBankAccountId) || undefined,
      address_type_id: util.types.toString(params.deliveryTypeId) || undefined,
      name: util.types.toString(params.deliveryName) || undefined,
      region: util.types.toString(params.deliveryRegion) || undefined,
      is_main_address: util.types.toBool(params.isMainDelivery) || undefined,
    };

    const { data } = await client.post(`/contacts`, {
      contact: {
        name: util.types.toString(params.name),
        contact_type_ids: params.contactTypeIds,
        reference: util.types.toString(params.reference) || undefined,
        default_sales_ledger_account_id:
          util.types.toString(params.defaultSalesLedgerId) || undefined,
        default_sales_tax_rate_id: util.types.toString(params.defaultSalesTaxRateId) || undefined,
        default_purchase_ledger_account_id:
          util.types.toString(params.defaultPurchaseLedgerId) || undefined,
        tax_number: util.types.toString(params.taxNumber) || undefined,
        notes: util.types.toString(params.notes) || undefined,
        credit_limit: util.types.toNumber(params.creditLimit) || undefined,
        credit_days: util.types.toNumber(params.creditDays) || undefined,
        source_guid: util.types.toString(params.sourceGuid) || undefined,
        currency_id: util.types.toString(params.currencyId) || undefined,
        main_address:
          params.addressName === undefined
            ? {
                address_line_1: util.types.toString(params.addressLine1) || undefined,
                address_line_2: util.types.toString(params.addressLine2) || undefined,
                city: util.types.toString(params.city) || undefined,
                postal_code: util.types.toString(params.postalCode) || undefined,
                country_id: util.types.toString(params.countryId) || undefined,
                bank_account_id: util.types.toString(params.bankAccountId) || undefined,

                address_type_id: util.types.toString(params.addressTypeId) || undefined,
                name: util.types.toString(params.addressName) || undefined,
                region: util.types.toString(params.region) || undefined,
                is_main_address: util.types.toBool(params.isMainAddress) || undefined,
              }
            : undefined,
        delivery_address: params.deliveryName === undefined ? deliveryAddress : undefined,
        bank_account_details: {
          account_name: util.types.toString(params.accountName) || undefined,
          account_number: util.types.toString(params.accountNumber) || undefined,
          sort_code: util.types.toString(params.sortCode) || undefined,
          bic: util.types.toString(params.bic) || undefined,
          iban: util.types.toString(params.iban) || undefined,
        },
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    name,
    contactTypeIds,
    reference,
    defaultSalesLedgerId,
    defaultSalesTaxRateId,
    defaultPurchaseLedgerId,
    taxNumber,
    notes,
    creditLimit,
    creditDays,
    sourceGuid,
    currencyId,
    addressName: { ...name, label: "Address Name", required: false },
    addressLine1,
    addressLine2,
    city,
    countryId,
    postalCode,
    bankAccountId,
    addressTypeId,
    region,
    deliveryName: { ...name, label: "Delivery Address Name", required: false },
    deliveryRegion: { ...region, label: "Delivery Address Region" },
    isMainAddress,
    deliveryLine1: { ...addressLine1, label: "Delivery Address Line 1" },
    deliveryLine2: { ...addressLine2, label: "Delivery Address Line 2" },
    deliveryCity: { ...city, label: "Delivery Address City" },
    deliveryPostalCode: {
      ...postalCode,
      label: "Delivery Address Postal Code",
    },
    deliveryCountryId: { ...countryId, label: "Delivery Address Country Id" },
    deliveryBankAccountId: {
      ...bankAccountId,
      label: "Delivery Address Bank Account Id",
    },
    deliveryTypeId: { ...addressTypeId, label: "Delivery Address Type Id" },
    isMainDelivery: { ...isMainAddress },
    accountName,
    accountNumber,
    sortCode,
    bic,
    iban,
  },
  examplePayload: {
    data: {
      results: {
        id: "example-80745034",
        displayed_as: "Example Contact",
        $path: "/contacts/example",
        created_at: "2022-01-03T18:00:57Z",
        updated_at: "2022-01-03T18:00:57Z",
        links: [
          {
            href: "https://accounting.na.sageone.com/contacts/customers/example",
            rel: "alternative",
            type: "text/html",
          },
        ],
        contact_types: [
          {
            id: "CUSTOMER",
            displayd_as: "Customer",
          },
        ],
        name: "exampleName",
        reference: null,
        default_sales_ledger_account: {
          id: "example",
          displayed_as: "Professional Fees",
        },
      },
    },
  },
});

export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update the information and metadata of an existing contact by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const deliveryAddress = {
      address_line_1: util.types.toString(params.deliveryLine1) || undefined,
      address_line_2: util.types.toString(params.deliveryLine2) || undefined,
      city: util.types.toString(params.deliveryCity) || undefined,
      postal_code: util.types.toString(params.deliveryPostalCode) || undefined,
      country_id: util.types.toString(params.deliveryCountryId) || undefined,
      bank_account_id: util.types.toString(params.deliveryBankAccountId) || undefined,
      address_type_id: util.types.toString(params.deliveryTypeId) || undefined,
      name: util.types.toString(params.deliveryName) || undefined,
      region: util.types.toString(params.deliveryRegion) || undefined,
      is_main_address: util.types.toBool(params.isMainDelivery) || undefined,
    };

    const { data } = await client.put(`/contacts/${params.contactId}`, {
      contact: {
        name: util.types.toString(params.name),
        contact_type_ids: params.contactTypeIds,
        reference: util.types.toString(params.reference) || undefined,
        default_sales_ledger_account_id:
          util.types.toString(params.defaultSalesLedgerId) || undefined,
        default_sales_tax_rate_id: util.types.toString(params.defaultSalesTaxRateId) || undefined,
        default_purchase_ledger_account_id:
          util.types.toString(params.defaultPurchaseLedgerId) || undefined,
        tax_number: util.types.toString(params.taxNumber) || undefined,
        notes: util.types.toString(params.notes) || undefined,
        credit_limit: util.types.toNumber(params.creditLimit) || undefined,
        credit_days: util.types.toNumber(params.creditDays) || undefined,
        source_guid: util.types.toString(params.sourceGuid) || undefined,
        currency_id: util.types.toString(params.currencyId) || undefined,
        main_address:
          params.addressName === undefined
            ? {
                address_line_1: util.types.toString(params.addressLine1) || undefined,
                address_line_2: util.types.toString(params.addressLine2) || undefined,
                city: util.types.toString(params.city) || undefined,
                postal_code: util.types.toString(params.postalCode) || undefined,
                country_id: util.types.toString(params.countryId) || undefined,
                bank_account_id: util.types.toString(params.bankAccountId) || undefined,

                address_type_id: util.types.toString(params.addressTypeId) || undefined,
                name: util.types.toString(params.addressName) || undefined,
                region: util.types.toString(params.region) || undefined,
                is_main_address: util.types.toBool(params.isMainAddress) || undefined,
              }
            : undefined,
        delivery_address: params.deliveryName === undefined ? deliveryAddress : undefined,
        bank_account_details: {
          account_name: util.types.toString(params.accountName) || undefined,
          account_number: util.types.toString(params.accountNumber) || undefined,
          sort_code: util.types.toString(params.sortCode) || undefined,
          bic: util.types.toString(params.bic) || undefined,
          iban: util.types.toString(params.iban) || undefined,
        },
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    contactId,
    name: { ...name, required: false },
    contactTypeIds: { ...contactTypeIds, required: false },
    reference,
    defaultSalesLedgerId,
    defaultSalesTaxRateId,
    defaultPurchaseLedgerId,
    taxNumber,
    notes,
    creditLimit,
    creditDays,
    sourceGuid,
    currencyId,
    addressName: { ...name, label: "Address Name", required: false },
    addressLine1,
    addressLine2,
    city,
    countryId,
    postalCode,
    bankAccountId,
    addressTypeId,
    region,
    deliveryName: {
      ...name,
      label: "Delivery Address Name",
      required: false,
    },
    deliveryRegion: { ...region, label: "Delivery Address Region" },
    isMainAddress,
    deliveryLine1: { ...addressLine1, label: "Delivery Address Line 1" },
    deliveryLine2: { ...addressLine2, label: "Delivery Address Line 2" },
    deliveryCity: { ...city, label: "Delivery Address City" },
    deliveryPostalCode: {
      ...postalCode,
      label: "Delivery Address Postal Code",
    },
    deliveryCountryId: {
      ...countryId,
      label: "Delivery Address Country Id",
    },
    deliveryBankAccountId: {
      ...bankAccountId,
      label: "Delivery Address Bank Account Id",
    },
    deliveryTypeId: {
      ...addressTypeId,
      label: "Delivery Address Type Id",
    },
    isMainDelivery: { ...isMainAddress },
    accountName,
    accountNumber,
    sortCode,
    bic,
    iban,
  },
  examplePayload: {
    data: {
      results: {
        id: "example-80745034",
        displayed_as: "Example Contact",
        $path: "/contacts/example",
        created_at: "2022-01-03T18:00:57Z",
        updated_at: "2022-01-03T18:00:57Z",
        links: [
          {
            href: "https://accounting.na.sageone.com/contacts/customers/example",
            rel: "alternative",
            type: "text/html",
          },
        ],
        contact_types: [
          {
            id: "CUSTOMER",
            displayd_as: "Customer",
          },
        ],
        name: "exampleName",
        reference: null,
        default_sales_ledger_account: {
          id: "example",
          displayed_as: "Professional Fees",
        },
      },
    },
  },
});
