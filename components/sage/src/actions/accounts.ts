import { action, util } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import {
  accountId,
  connection,
  displayName,
  gifiCode,
  includedInChart,
  itemsPerPage,
  ledgerAccountId,
  ledgerAccountTypeId,
  name,
  nominalCode,
  page,
  taxRateId,
  updated_or_created_since,
} from "../inputs";

export const listLedgerAccounts = action({
  display: {
    label: "List Ledger Accounts",
    description: "List all Ledger accounts",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/ledger_accounts", {
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

export const listLedgerAccountTypes = action({
  display: {
    label: "List Ledger Account Types",
    description: "List all Ledger account types",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/ledger_account_types", {
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

export const getLedgerAccount = action({
  display: {
    label: "Get Ledger Account",
    description: "Get the information and metadata of a Ledger account",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get(`/ledger_accounts/${params.ledgerAccountId}`);

    return {
      data,
    };
  },
  inputs: { connection, ledgerAccountId },
});

export const createLedgerAccount = action({
  display: {
    label: "Create Ledger Account",
    description: "Create a new Ledger account",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.post("/ledger_accounts", {
      ledger_account: {
        ledger_account_type_id: util.types.toString(params.ledgerAccountTypeId),
        included_in_chart: util.types.toBool(params.includedInChart),
        name: util.types.toString(params.name),
        display_name: util.types.toString(params.displayName),
        nominal_code: util.types.toNumber(params.nominalCode),
        tax_rate_id: util.types.toString(params.taxRateId) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    ledgerAccountTypeId,
    includedInChart,
    name,
    displayName,
    nominalCode,
    taxRateId: { ...taxRateId, required: false },
  },
});

export const updateLedgerAccount = action({
  display: {
    label: "Update Ledger Account",
    description: "Update the information and metadata of a Ledger account by Id",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.put(`/ledger_accounts/${params.accountId}`, {
      ledger_account: {
        ledger_account_type_id: util.types.toString(params.ledgerAccountTypeId) || undefined,
        included_in_chart: util.types.toBool(params.includedInChart) || undefined,
        name: util.types.toString(params.name) || undefined,
        display_name: util.types.toString(params.displayName) || undefined,
        nominal_code: util.types.toNumber(params.nominalCode) || undefined,
        tax_rate_id: util.types.toString(params.taxRateId) || undefined,
        gifi_code: util.types.toNumber(params.gifiCode) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    accountId,
    ledgerAccountTypeId,
    includedInChart,
    name,
    displayName,
    nominalCode,
    taxRateId: { ...taxRateId, required: false },
    gifiCode,
  },
});
